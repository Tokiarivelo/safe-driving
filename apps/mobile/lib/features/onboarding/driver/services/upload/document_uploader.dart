import 'dart:developer' as developer;
import 'dart:io';
import 'package:flutter/foundation.dart' show kIsWeb;
import 'package:http/http.dart' as http;
import 'package:path/path.dart' as p;
import 'package:safe_driving/core/utils/s3_presign_url.dart';
import '../../repositories/driver_repository.dart';
import '../storage_service.dart';
import '../web_upload_registry.dart';
import '../utils/content_type_util.dart';
import '../utils/document_type_mapper.dart';
import '../utils/upload_key_builder.dart';
import 'upload_client.dart';

class DocumentUploader {
  final DriverRepository _repository;
  final StorageService _storage;
  final UploadClient _client = UploadClient();

  DocumentUploader(this._repository, this._storage);

  Future<void> uploadDocumentPhotos({
    required String userId,
    required List<File> photos,
    required String documentType,
    String? currentVehicleId,
  }) async {
    final isVehicleDoc = DocumentTypeMapper.isVehicleDocumentType(documentType);
    final isVehicleImgs = DocumentTypeMapper.isVehicleImagesType(documentType);
    final useVehicleFlow = isVehicleDoc || isVehicleImgs;
    final fileTypeEnum = useVehicleFlow ? 'VEHICLE' : 'USER';
    final mappedUserType = DocumentTypeMapper.mapUserDocumentType(documentType);
    final mappedVehicleDocType = DocumentTypeMapper.mapVehicleDocumentType(
      documentType,
    );

    developer.log(
      'DocumentUploader.uploadDocumentPhotos start: type=$documentType userMap=$mappedUserType vehicleMap=$mappedVehicleDocType count=${photos.length} isWeb=$kIsWeb vehicleFlow=$useVehicleFlow',
    );

    if (useVehicleFlow &&
        (currentVehicleId == null || currentVehicleId.isEmpty)) {
      throw StateError(
        'Aucun véhicule associé: enregistrez d\'abord les infos du véhicule',
      );
    }

    try {
      if (kIsWeb) {
        final filesMeta = <Map<String, String>>[];
        for (final photo in photos) {
          final originalName = p.basename(photo.path);
          final inferredType = ContentTypeUtil.infer(originalName);
          final contentType =
              WebUploadRegistry.getContentType(photo.path) ?? inferredType;
          filesMeta.add({
            'originalName': originalName,
            'contentType': contentType,
          });
        }

        String presignTypeUsed = fileTypeEnum;
        List<Map<String, dynamic>> presigned;
        try {
          presigned = await _repository.createBatchPresignedUrls(
            type: presignTypeUsed,
            files: filesMeta,
          );
        } catch (e) {
          developer.log(
            'createBatchPresignedUrls($presignTypeUsed) failed: $e. Retrying with USER.',
          );
          presignTypeUsed = 'USER';
          presigned = await _repository.createBatchPresignedUrls(
            type: presignTypeUsed,
            files: filesMeta,
          );
        }

        final uploadedKeys = <String>[];
        final putUrls = <String>[];
        final sizes = <int>[];
        for (var i = 0; i < photos.length; i++) {
          final meta = presigned[i];
          final key = (meta['key'] ?? '').toString();
          final url = (meta['url'] ?? '').toString();
          if (key.isEmpty || url.isEmpty) {
            throw StateError('Invalid presign response for index $i');
          }
          final adjustedUrl = PresignedUrlUtil.adjustForDevice(url);
          final bytes = WebUploadRegistry.getBytes(photos[i].path);
          if (bytes == null) {
            throw StateError('Missing bytes for ${photos[i].path} on web');
          }
          sizes.add(bytes.length);
          final ct = filesMeta[i]['contentType'] ?? 'application/octet-stream';
          final headers = <String, String>{'Content-Type': ct};
          final parsed = Uri.parse(adjustedUrl);
          final hasChecksumParam =
              parsed.queryParameters.containsKey('x-amz-checksum-crc32') ||
              parsed.queryParameters.containsKey('X-Amz-Checksum-Crc32');
          if (!hasChecksumParam) {
            try {
              // compute CRC32
              // not importing ChecksumUtil here to keep web-friendly; okay to omit header
            } catch (_) {}
          }
          final resp = await http.put(parsed, headers: headers, body: bytes);
          if (resp.statusCode < 200 || resp.statusCode >= 300) {
            developer.log(
              'Web PUT failed: status=${resp.statusCode} body=${resp.body}',
            );
            throw Exception('Web upload failed: ${resp.statusCode}');
          }
          uploadedKeys.add(key);
          putUrls.add(adjustedUrl);
        }
        developer.log(
          'DocumentUploader(web) PUT ok: keys=${uploadedKeys.join(', ')}',
        );

        try {
          await _repository.completeUploadBulk(
            keys: uploadedKeys,
            type: presignTypeUsed,
          );
        } catch (e) {
          if (presignTypeUsed != 'USER') {
            developer.log(
              'completeUploadBulk($presignTypeUsed) failed: $e. Retrying with USER.',
            );
            try {
              presignTypeUsed = 'USER';
              await _repository.completeUploadBulk(
                keys: uploadedKeys,
                type: presignTypeUsed,
              );
            } catch (e2) {
              developer.log('completeUploadBulk(USER) failed: $e2');
            }
          } else {
            developer.log('completeUploadBulk(USER) failed: $e');
          }
        }

        for (var i = 0; i < uploadedKeys.length; i++) {
          try {
            await _repository.createUpload(
              userId: userId,
              documentType: useVehicleFlow
                  ? mappedVehicleDocType
                  : mappedUserType,
              key: uploadedKeys[i],
              url: putUrls[i],
              size: sizes[i],
              originalName: filesMeta[i]['originalName'],
              contentType: filesMeta[i]['contentType'],
              etag: null,
              driverVehicleId: useVehicleFlow ? currentVehicleId : null,
            );
          } catch (e) {
            developer.log('createUpload(web) for key=${uploadedKeys[i]}: $e');
          }
        }

        if (!useVehicleFlow) {
          final attachInputs = <Map<String, dynamic>>[];
          if (mappedUserType == 'DRIVER_LICENSE') {
            if (uploadedKeys.length >= 2) {
              attachInputs.add({
                'documentType': 'DRIVER_LICENSE_FRONT',
                'file': {'key': uploadedKeys[0]},
                'name': 'Permis (Recto)',
              });
              attachInputs.add({
                'documentType': 'DRIVER_LICENSE_BACK',
                'file': {'key': uploadedKeys[1]},
                'name': 'Permis (Verso)',
              });
            } else if (uploadedKeys.isNotEmpty) {
              attachInputs.add({
                'documentType': 'DRIVER_LICENSE_FRONT',
                'file': {'key': uploadedKeys.first},
                'name': 'Permis (Recto)',
              });
            }
          } else {
            final defaultName = DocumentTypeMapper.defaultNameForDocumentType(
              mappedUserType,
            );
            for (final key in uploadedKeys) {
              final map = {
                'documentType': mappedUserType,
                'file': {'key': key},
              };
              if (defaultName != null) map['name'] = defaultName;
              attachInputs.add(map);
            }
          }
          developer.log(
            'DocumentUploader(web) attaching USER: ${attachInputs.map((m) => m['documentType']).join(', ')}',
          );
          await _repository.uploadUserDocuments(input: attachInputs);
        } else {
          if (isVehicleImgs) {
            try {
              developer.log('DocumentUploader(web) attaching VEHICLE PHOTOS');
              final defaultName =
                  DocumentTypeMapper.defaultNameForDocumentType(
                    'VEHICLE_PHOTO',
                  ) ??
                  'Photo du véhicule';
              final docsInput = uploadedKeys
                  .map(
                    (k) => {
                      'documentType': 'OTHER',
                      'file': {'key': k},
                      'name': defaultName,
                    },
                  )
                  .toList();
              await _repository.uploadVehicleDocuments(
                vehicleId: currentVehicleId!,
                input: docsInput,
              );
            } catch (e) {
              developer.log('uploadVehicleDocuments(web, photos) failed: $e');
              final attachInputs = uploadedKeys
                  .map(
                    (k) => {
                      'documentType': 'OTHER',
                      'file': {'key': k},
                      'name':
                          DocumentTypeMapper.defaultNameForDocumentType(
                            'VEHICLE_PHOTO',
                          ) ??
                          'Photo du véhicule',
                    },
                  )
                  .toList();
              await _repository.uploadUserDocuments(input: attachInputs);
            }
          } else {
            try {
              final defaultName =
                  DocumentTypeMapper.defaultNameForDocumentType(
                    mappedVehicleDocType,
                  ) ??
                  '';
              final docsInput = uploadedKeys
                  .map(
                    (k) => {
                      'documentType': mappedVehicleDocType,
                      'file': {'key': k},
                      'name': defaultName,
                    },
                  )
                  .toList();
              developer.log('DocumentUploader(web) attaching VEHICLE DOCS');
              await _repository.uploadVehicleDocuments(
                vehicleId: currentVehicleId!,
                input: docsInput,
              );
            } catch (e) {
              developer.log('uploadVehicleDocuments(web) failed: $e');
              const effectiveUserType = 'OTHER';
              final defaultName = DocumentTypeMapper.defaultNameForDocumentType(
                effectiveUserType,
              );
              final attachInputs = uploadedKeys.map((k) {
                final map = {
                  'documentType': effectiveUserType,
                  'file': {'key': k},
                };
                if (defaultName != null) map['name'] = defaultName;
                return map;
              }).toList();
              await _repository.uploadUserDocuments(input: attachInputs);
            }
          }
        }
        developer.log('DocumentUploader(web) done');
        return;
      }

      // Mobile/Desktop (non-web)
      await _storage.storePhotos(photos, documentType);

      final filesMeta = <Map<String, String>>[];
      for (final photo in photos) {
        filesMeta.add({
          'originalName': p.basename(photo.path),
          'contentType': ContentTypeUtil.infer(photo.path),
        });
      }
      final presigned = await _repository.createBatchPresignedUrls(
        type: fileTypeEnum,
        files: filesMeta,
      );

      final uploadedKeys = <String>[];
      final etags = <String?>[];
      final urls = <String>[];
      final sizes = <int>[];
      for (var i = 0; i < photos.length; i++) {
        final photo = photos[i];
        final meta = presigned[i];
        final key = (meta['key'] ?? '').toString();
        final url = (meta['url'] ?? '').toString();
        if (key.isEmpty || url.isEmpty) {
          throw StateError('Invalid presign response for index $i');
        }
        final adjustedUrl = PresignedUrlUtil.adjustForDevice(url);
        final contentType = ContentTypeUtil.infer(photo.path);
        final etag = await _client.putFile(
          adjustedUrl,
          photo,
          contentType: contentType,
        );
        final stat = await photo.stat();
        uploadedKeys.add(key);
        etags.add(etag);
        urls.add(adjustedUrl);
        sizes.add(stat.size);
      }
      developer.log(
        'DocumentUploader(mobile) PUT ok: keys=${uploadedKeys.join(', ')}',
      );

      try {
        await _repository.completeUploadBulk(
          keys: uploadedKeys,
          type: fileTypeEnum,
        );
      } catch (e) {
        developer.log('completeUploadBulk(mobile) failed: $e');
      }

      for (var i = 0; i < uploadedKeys.length; i++) {
        try {
          await _repository.createUpload(
            userId: userId,
            documentType: useVehicleFlow
                ? mappedVehicleDocType
                : mappedUserType,
            key: uploadedKeys[i],
            url: urls[i],
            size: sizes[i],
            originalName: filesMeta[i]['originalName'],
            contentType: filesMeta[i]['contentType'],
            etag: etags[i],
            driverVehicleId: useVehicleFlow ? currentVehicleId : null,
          );
        } catch (e) {
          developer.log('createUpload(mobile) for key=${uploadedKeys[i]}: $e');
        }
      }

      if (!useVehicleFlow) {
        final attachInputs = <Map<String, dynamic>>[];
        if (mappedUserType == 'DRIVER_LICENSE') {
          if (uploadedKeys.length >= 2) {
            attachInputs.add({
              'documentType': 'DRIVER_LICENSE_FRONT',
              'file': {'key': uploadedKeys[0]},
              'name': 'Permis (Recto)',
            });
            attachInputs.add({
              'documentType': 'DRIVER_LICENSE_BACK',
              'file': {'key': uploadedKeys[1]},
              'name': 'Permis (Verso)',
            });
          } else if (uploadedKeys.isNotEmpty) {
            attachInputs.add({
              'documentType': 'DRIVER_LICENSE_FRONT',
              'file': {'key': uploadedKeys.first},
              'name': 'Permis (Recto)',
            });
          }
        } else {
          final defaultName = DocumentTypeMapper.defaultNameForDocumentType(
            mappedUserType,
          );
          for (final key in uploadedKeys) {
            final map = {
              'documentType': mappedUserType,
              'file': {'key': key},
            };
            if (defaultName != null) map['name'] = defaultName;
            attachInputs.add(map);
          }
        }
        developer.log(
          'DocumentUploader(mobile) attaching USER: ${attachInputs.map((m) => m['documentType']).join(', ')}',
        );
        await _repository.uploadUserDocuments(input: attachInputs);
      } else {
        if (isVehicleImgs) {
          final defaultName =
              DocumentTypeMapper.defaultNameForDocumentType('VEHICLE_PHOTO') ??
              'Photo du véhicule';
          final docsInput = uploadedKeys
              .map(
                (k) => {
                  'documentType': 'OTHER',
                  'file': {'key': k},
                  'name': defaultName,
                },
              )
              .toList();
          developer.log('DocumentUploader(mobile) attaching VEHICLE PHOTOS');
          await _repository.uploadVehicleDocuments(
            vehicleId: currentVehicleId!,
            input: docsInput,
          );
        } else {
          final defaultName =
              DocumentTypeMapper.defaultNameForDocumentType(
                mappedVehicleDocType,
              ) ??
              '';
          final docsInput = uploadedKeys
              .map(
                (k) => {
                  'documentType': mappedVehicleDocType,
                  'file': {'key': k},
                  'name': defaultName,
                },
              )
              .toList();
          developer.log('DocumentUploader(mobile) attaching VEHICLE DOCS');
          await _repository.uploadVehicleDocuments(
            vehicleId: currentVehicleId!,
            input: docsInput,
          );
        }
      }
      developer.log('DocumentUploader(mobile) done');
    } catch (e) {
      developer.log('DocumentUploader.uploadDocumentPhotos error: $e');
      rethrow;
    }
  }

  Future<void> uploadSelfie({
    required String userId,
    required File photo,
  }) async {
    try {
      await _storage.storePhoto(photo, StorageService.selfieType);

      if (kIsWeb) {
        final meta = <String, String>{
          'originalName': p.basename(photo.path),
          'contentType':
              WebUploadRegistry.getContentType(photo.path) ??
              ContentTypeUtil.infer(photo.path),
        };
        final presigned = await _repository.createBatchPresignedUrls(
          type: 'USER',
          files: [meta],
        );
        final key = (presigned.first['key'] ?? '').toString();
        final url = (presigned.first['url'] ?? '').toString();
        if (key.isEmpty || url.isEmpty) {
          throw StateError('Invalid presign response');
        }
        final adjustedUrl = PresignedUrlUtil.adjustForDevice(url);
        final bytes = WebUploadRegistry.getBytes(photo.path);
        if (bytes == null) {
          throw StateError('Missing bytes for ${photo.path} on web');
        }
        final resp = await http.put(
          Uri.parse(adjustedUrl),
          headers: {'Content-Type': meta['contentType']!},
          body: bytes,
        );
        if (resp.statusCode < 200 || resp.statusCode >= 300) {
          throw Exception('Web upload failed: ${resp.statusCode}');
        }
        try {
          await _repository.completeUploadBulk(keys: [key], type: 'USER');
        } catch (_) {}
        try {
          await _repository.createUpload(
            userId: userId,
            documentType: 'SELFIE',
            key: key,
            url: adjustedUrl,
            size: bytes.length,
            originalName: meta['originalName'],
            contentType: meta['contentType'],
            etag: null,
          );
        } catch (_) {}
        try {
          await _repository.uploadUserDocuments(
            input: [
              {
                'documentType': 'OTHER',
                'file': {'key': key},
                'name': 'Selfie',
              },
            ],
          );
        } catch (_) {}
        return;
      }

      final contentType = ContentTypeUtil.infer(photo.path);
      final fileName = p.basename(photo.path);
      final key = UploadKeyBuilder.buildS3Key(userId, 'SELFIE', fileName);
      final url = await _repository.generatePresignedUrl(
        key: key,
        contentType: contentType,
      );
      final adjustedUrl = PresignedUrlUtil.adjustForDevice(url);
      final etag = await _client.putFile(
        adjustedUrl,
        photo,
        contentType: contentType,
      );

      try {
        await _repository.completeUploadBulk(keys: [key], type: 'USER');
      } catch (_) {}

      final stat = await photo.stat();
      try {
        await _repository.createUpload(
          userId: userId,
          documentType: 'SELFIE',
          key: key,
          url: adjustedUrl,
          size: stat.size,
          originalName: fileName,
          contentType: contentType,
          etag: etag,
        );
      } catch (_) {}

      try {
        await _repository.uploadUserDocuments(
          input: [
            {
              'documentType': 'OTHER',
              'file': {'key': key},
              'name': 'Selfie',
            },
          ],
        );
      } catch (_) {}
    } catch (e) {
      throw Exception('Failed to upload selfie: $e');
    }
  }
}
