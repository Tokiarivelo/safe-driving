import 'dart:io';
import 'dart:convert';
import 'dart:developer' as developer;
import 'package:flutter/foundation.dart' show kIsWeb;
import 'package:permission_handler/permission_handler.dart';
import 'package:path/path.dart' as p;
import 'package:http/http.dart' as http;
import '../core/interfaces/driver_service_interface.dart';
import '../repositories/driver_repository.dart';
import 'storage_service.dart';
import 'web_upload_registry.dart';
import 'package:safe_driving/features/authentication/services/session_service.dart';
import 'package:safe_driving/core/utils/s3_presign_url.dart';
import 'package:safe_driving/core/utils/checksum.dart';

class DriverService implements IDriverService {
  final DriverRepository _repository;
  final StorageService _storageService;
  final SessionService _sessionService;


  String? _currentVehicleId;

  int _backendPersonalPhotos = 0;
  int _backendVehiclePhotos = 0;

  DriverService(this._repository, this._storageService, this._sessionService);

  @override
  Future<bool> requestCameraPermission() async {
    try {
      final status = await Permission.camera.request();
      return status.isGranted;
    } catch (e) {
      return false;
    }
  }

  @override
  Future<bool> requestStoragePermission() async {
    try {
      final status = await Permission.storage.request();
      return status.isGranted;
    } catch (e) {
      return false;
    }
  }

  @override
  Future<bool> requestLocationPermission() async {
    try {
      final status = await Permission.location.request();
      return status.isGranted;
    } catch (e) {
      return false;
    }
  }

  @override
  Future<void> savePersonalInfo(Map<String, dynamic> personalInfo) async {
    if (!validatePersonalInfo(personalInfo)) {
      throw ArgumentError('Invalid personal info data');
    }

    try {
      final userId = _getUserIdOrThrow();
      await _repository.savePersonalInfo(
        userId: userId,
        name: personalInfo['name'] ?? '',
        email: personalInfo['email'] ?? '',
        phone: personalInfo['phone'] ?? '',
      );
    } catch (e) {
      throw Exception('Failed to save personal info: $e');
    }
  }

  @override
  Future<void> saveVehicleInfo(Map<String, dynamic> vehicleInfo) async {
    if (!validateVehicleInfo(vehicleInfo)) {
      throw ArgumentError('Invalid vehicle info data');
    }

    try {
      final userId = _getUserIdOrThrow();
      final marque = (vehicleInfo['marque'] ?? '').toString();
      final modele = (vehicleInfo['modele'] ?? '').toString();
      final immatriculation = (vehicleInfo['immatriculation'] ?? '').toString();
      final placesStr = (vehicleInfo['places'] ?? '').toString();
      final typeVehicule = (vehicleInfo['type'] ?? vehicleInfo['typeVehicule'] ?? '').toString();
      final places = int.tryParse(placesStr);

      final created = await _repository.saveVehicleInfo(
        userId: userId,
        marque: marque,
        modele: modele,
        immatriculation: immatriculation,
        places: places,
        typeVehicule: typeVehicule.isNotEmpty ? typeVehicule : null,
      );
      try {
        _currentVehicleId = (created['id'] ?? created['vehicleId'] ?? '').toString();
      } catch (_) {
        _currentVehicleId = null;
      }
    } catch (e) {
      throw Exception('Failed to save vehicle info: $e');
    }
  }

  Future<String?> _uploadToS3(String url, File file, String contentType) async {
    final client = HttpClient();
    try {
      final parsed = Uri.parse(url);
      final hasChecksumParam = parsed.queryParameters.containsKey('x-amz-checksum-crc32') ||
          parsed.queryParameters.containsKey('X-Amz-Checksum-Crc32');

      final req = await client.putUrl(parsed);
      req.headers.set(HttpHeaders.contentTypeHeader, contentType);
      final bytes = await file.readAsBytes();

      try {
        if (!hasChecksumParam) {
          final checksum = ChecksumUtil.crc32Base64(bytes);
          req.headers.set('x-amz-checksum-crc32', checksum);
        }
      } catch (_) {}
      req.add(bytes);
      final resp = await req.close();
      if (resp.statusCode < 200 || resp.statusCode >= 300) {
        final body = await resp.transform(utf8.decoder).join();
        throw HttpException('S3 upload failed: ${resp.statusCode} - $body');
      }
      return resp.headers.value('etag');
    } catch (e) {
      developer.log('S3 Upload Error: $e');
      rethrow;
    } finally {
      client.close(force: true);
    }
  }

  String _inferContentType(String path) {
    final lower = path.toLowerCase();
    if (lower.endsWith('.png')) return 'image/png';
    if (lower.endsWith('.jpg') || lower.endsWith('.jpeg')) return 'image/jpeg';
    if (lower.endsWith('.heic')) return 'image/heic';

    return 'image/jpeg';
    }

  String _mapUserDocumentType(String type) {
    switch (type) {
      case 'identity_recto':
      case 'carte_identite_recto':
      case 'carteIdentiteRecto':
        return 'ID_CARD_FRONT';
      case 'identity_verso':
      case 'carte_identite_verso':
      case 'carteIdentiteVerso':
        return 'ID_CARD_BACK';
      case 'driving_license':
      case 'permis_conduire':
      case 'permisConduire':
        return 'DRIVER_LICENSE';
      case 'selfie':
        return 'SELFIE';
      default:
        return type.toUpperCase();
    }
  }

  String _mapVehicleDocumentType(String type) {
    switch (type) {
      case 'certificat_immatriculation':
      case 'certificatImmatriculation':
        return 'REGISTRATION';
      case 'attestation_assurance':
      case 'attestationAssurance':
        return 'INSURANCE';
      default:
        return 'OTHER';
    }
  }

  bool _isVehicleDocumentType(String type) {
    return type == 'certificatImmatriculation' ||
        type == 'certificat_immatriculation' ||
        type == 'attestationAssurance' ||
        type == 'attestation_assurance';
  }

  bool _isVehicleImagesType(String type) {
    return type == 'photosVehicule' || type == 'photos_vehicule';
  }

  String _buildS3Key(String userId, String documentType, String fileName) {
    final ts = DateTime.now().millisecondsSinceEpoch;
    return 'uploads/users/$userId/driver/$documentType/${ts}_$fileName';
  }

  String? _defaultNameForDocumentType(String backendType) {
    switch (backendType) {
      case 'ID_CARD_FRONT':
        return "Carte d'identité (Recto)";
      case 'ID_CARD_BACK':
        return "Carte d'identité (Verso)";
      case 'REGISTRATION':
      case 'VEHICLE_REGISTRATION': 
        return "Certificat d'immatriculation";
      case 'INSURANCE':
        return "Attestation d'assurance";
      case 'VEHICLE_PHOTO':
        return 'Photo du véhicule';
      default:
        return null;
    }
  }

  @override
  Future<void> uploadDocumentPhotos(
    List<File> photos,
    String documentType,
  ) async {
    final userId = _getUserIdOrThrow();
    final isVehicleDoc = _isVehicleDocumentType(documentType);
    final isVehicleImgs = _isVehicleImagesType(documentType);
    final useVehicleFlow = isVehicleDoc || isVehicleImgs;
    final fileTypeEnum = useVehicleFlow ? 'VEHICLE' : 'USER';
    final mappedUserType = _mapUserDocumentType(documentType);
    final mappedVehicleDocType = _mapVehicleDocumentType(documentType);

    developer.log('uploadDocumentPhotos start: type=$documentType userMap=$mappedUserType vehicleMap=$mappedVehicleDocType count=${photos.length} isWeb=$kIsWeb vehicleFlow=$useVehicleFlow');

    if (useVehicleFlow && (_currentVehicleId == null || _currentVehicleId!.isEmpty)) {
      throw StateError('Aucun véhicule associé: enregistrez d\'abord les infos du véhicule');
    }

    try {
  
      if (kIsWeb) {

        final filesMeta = <Map<String, String>>[];
        for (final photo in photos) {
          final originalName = p.basename(photo.path);
          final inferredType = _inferContentType(originalName);
          final contentType = WebUploadRegistry.getContentType(photo.path) ?? inferredType;
          filesMeta.add({'originalName': originalName, 'contentType': contentType});
        }
      

        String presignTypeUsed = fileTypeEnum;
        List<Map<String, dynamic>> presigned;
        try {
          presigned = await _repository.createBatchPresignedUrls(
            type: presignTypeUsed,
            files: filesMeta,
          );
        } catch (e) {
          developer.log('createBatchPresignedUrls($presignTypeUsed) failed: $e. Retrying with USER.');
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
          String? crc32b64;
          try {
            crc32b64 = ChecksumUtil.crc32Base64(bytes);
          } catch (_) {}
          final headers = <String, String>{'Content-Type': ct};
          final parsed = Uri.parse(adjustedUrl);
          final hasChecksumParam = parsed.queryParameters.containsKey('x-amz-checksum-crc32') ||
              parsed.queryParameters.containsKey('X-Amz-Checksum-Crc32');
          if (!hasChecksumParam && crc32b64 != null) {
            headers['x-amz-checksum-crc32'] = crc32b64;
          }
          final resp = await http.put(parsed, headers: headers, body: bytes);
          if (resp.statusCode < 200 || resp.statusCode >= 300) {
            developer.log('Web PUT failed: status=${resp.statusCode} body=${resp.body}');
            throw Exception('Web upload failed: ${resp.statusCode}');
          }
          uploadedKeys.add(key);
          putUrls.add(adjustedUrl);
        }
        developer.log('uploadDocumentPhotos(web) PUT ok: keys=${uploadedKeys.join(', ')}');

    
        try {
          await _repository.completeUploadBulk(
            keys: uploadedKeys,
            type: presignTypeUsed,
          );
        } catch (e) {
          if (presignTypeUsed != 'USER') {
            developer.log('completeUploadBulk($presignTypeUsed) failed: $e. Retrying with USER.');
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
              documentType: useVehicleFlow ? mappedVehicleDocType : mappedUserType,
              key: uploadedKeys[i],
              url: putUrls[i],
              size: sizes[i],
              originalName: filesMeta[i]['originalName'],
              contentType: filesMeta[i]['contentType'],
              etag: null,
              driverVehicleId: useVehicleFlow ? _currentVehicleId : null,
            );
          } catch (e) {
            // Ignore if already created or backend rejects duplicate key
            developer.log('createUpload(web) for key=${uploadedKeys[i]}: $e');
          }
        }

        // 4) Attach files
        if (!useVehicleFlow) {
          // User docs flow (identity, license, selfie)
          final attachInputs = <Map<String, dynamic>>[];
          if (mappedUserType == 'DRIVER_LICENSE') {
            if (uploadedKeys.length >= 2) {
              attachInputs.add({
                'documentType': 'DRIVER_LICENSE_FRONT',
                'file': {'key': uploadedKeys[0]},
                'name': 'Permis (Recto)'
              });
              attachInputs.add({
                'documentType': 'DRIVER_LICENSE_BACK',
                'file': {'key': uploadedKeys[1]},
                'name': 'Permis (Verso)'
              });
            } else if (uploadedKeys.isNotEmpty) {
              attachInputs.add({
                'documentType': 'DRIVER_LICENSE_FRONT',
                'file': {'key': uploadedKeys.first},
                'name': 'Permis (Recto)'
              });
            }
          } else {
            final defaultName = _defaultNameForDocumentType(mappedUserType);
            for (final key in uploadedKeys) {
              final map = {'documentType': mappedUserType, 'file': {'key': key}};
              if (defaultName != null) map['name'] = defaultName;
              attachInputs.add(map);
            }
          }
          developer.log('uploadDocumentPhotos(web) attaching USER: ${attachInputs.map((m) => m['documentType']).join(', ')}');
          await _repository.uploadUserDocuments(input: attachInputs);
        } else {
          // Vehicle docs/images flow
          if (isVehicleImgs) {
            try {
 
              developer.log('uploadDocumentPhotos(web) attaching VEHICLE PHOTOS as VehicleDocument x${uploadedKeys.length}');
              final defaultName = _defaultNameForDocumentType('VEHICLE_PHOTO') ?? 'Photo du véhicule';
              final docsInput = uploadedKeys
                  .map((k) => {
                        'documentType': 'OTHER',
                        'file': {'key': k},
                        'name': defaultName,
                      })
                  .toList();
              await _repository.uploadVehicleDocuments(vehicleId: _currentVehicleId!, input: docsInput);
            } catch (e) {
              developer.log('uploadVehicleDocuments(web, photos) failed: $e');
              // Fallback: attach as generic user docs to avoid misclassification
              final attachInputs = uploadedKeys
                  .map((k) => {
                        'documentType': 'OTHER',
                        'file': {'key': k},
                        'name': _defaultNameForDocumentType('VEHICLE_PHOTO') ?? 'Photo du véhicule',
                      })
                  .toList();
              await _repository.uploadUserDocuments(input: attachInputs);
            }
          } else {
            try {
              final defaultName = _defaultNameForDocumentType(mappedVehicleDocType) ?? '';
              final docsInput = uploadedKeys
                  .map((k) => {
                        'documentType': mappedVehicleDocType,
                        'file': {'key': k},
                        'name': defaultName,
                      })
                  .toList();
              developer.log('uploadDocumentPhotos(web) attaching VEHICLE DOCS: ${docsInput.map((m) => m['documentType']).join(', ')}');
              await _repository.uploadVehicleDocuments(vehicleId: _currentVehicleId!, input: docsInput);
            } catch (e) {
              developer.log('uploadVehicleDocuments(web) failed: $e');
              // Fallback: attach as generic user docs to avoid misclassification
              const effectiveUserType = 'OTHER';
              final defaultName = _defaultNameForDocumentType(effectiveUserType);
              final attachInputs = uploadedKeys
                  .map((k) {
                    final map = {'documentType': effectiveUserType, 'file': {'key': k}};
                    if (defaultName != null) map['name'] = defaultName;
                    return map;
                  })
                  .toList();
              await _repository.uploadUserDocuments(input: attachInputs);
            }
          }
        }
        developer.log('uploadDocumentPhotos(web) done');
        return;
      }

     
      await _storageService.storePhotos(photos, documentType);

      // 1) Presign
      final filesMeta = <Map<String, String>>[];
      for (final photo in photos) {
        filesMeta.add({
          'originalName': p.basename(photo.path),
          'contentType': _inferContentType(photo.path),
        });
      }
      final presigned = await _repository.createBatchPresignedUrls(type: fileTypeEnum, files: filesMeta);

      // 2) Upload with native client (captures ETag)
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
        final contentType = _inferContentType(photo.path);
        final etag = await _uploadToS3(adjustedUrl, photo, contentType);
        final stat = await photo.stat();
        uploadedKeys.add(key);
        etags.add(etag);
        urls.add(adjustedUrl);
        sizes.add(stat.size);
      }
      developer.log('uploadDocumentPhotos(mobile) PUT ok: keys=${uploadedKeys.join(', ')}');

      // 3) Complete
      try {
        await _repository.completeUploadBulk(keys: uploadedKeys, type: fileTypeEnum);
      } catch (e) {
        developer.log('completeUploadBulk(mobile) failed: $e');
      }

      // 3bis) Ensure File rows exist for all keys
      for (var i = 0; i < uploadedKeys.length; i++) {
        try {
          await _repository.createUpload(
            userId: userId,
            documentType: useVehicleFlow ? mappedVehicleDocType : mappedUserType,
            key: uploadedKeys[i],
            url: urls[i],
            size: sizes[i],
            originalName: filesMeta[i]['originalName'],
            contentType: filesMeta[i]['contentType'],
            etag: etags[i],
            driverVehicleId: useVehicleFlow ? _currentVehicleId : null,
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
              'name': 'Permis (Recto)'
            });
            attachInputs.add({
              'documentType': 'DRIVER_LICENSE_BACK',
              'file': {'key': uploadedKeys[1]},
              'name': 'Permis (Verso)'
            });
          } else if (uploadedKeys.isNotEmpty) {
            attachInputs.add({
              'documentType': 'DRIVER_LICENSE_FRONT',
              'file': {'key': uploadedKeys.first},
              'name': 'Permis (Recto)'
            });
          }
        } else {
          final defaultName = _defaultNameForDocumentType(mappedUserType);
          for (final key in uploadedKeys) {
            final map = {'documentType': mappedUserType, 'file': {'key': key}};
            if (defaultName != null) map['name'] = defaultName;
            attachInputs.add(map);
          }
        }
        developer.log('uploadDocumentPhotos(mobile) attaching USER: ${attachInputs.map((m) => m['documentType']).join(', ')}');
        await _repository.uploadUserDocuments(input: attachInputs);
      } else {
        if (isVehicleImgs) {
          // Attach photos as VehicleDocument OTHER with a friendly name
          final defaultName = _defaultNameForDocumentType('VEHICLE_PHOTO') ?? 'Photo du véhicule';
          final docsInput = uploadedKeys
              .map((k) => {
                    'documentType': 'OTHER',
                    'file': {'key': k},
                    'name': defaultName,
                  })
              .toList();
          developer.log('uploadDocumentPhotos(mobile) attaching VEHICLE PHOTOS as VehicleDocument x${uploadedKeys.length}');
          await _repository.uploadVehicleDocuments(vehicleId: _currentVehicleId!, input: docsInput);
        } else {
          final defaultName = _defaultNameForDocumentType(mappedVehicleDocType) ?? '';
          final docsInput = uploadedKeys
              .map((k) => {
                    'documentType': mappedVehicleDocType,
                    'file': {'key': k},
                    'name': defaultName,
                  })
              .toList();
          developer.log('uploadDocumentPhotos(mobile) attaching VEHICLE DOCS: ${docsInput.map((m) => m['documentType']).join(', ')}');
          await _repository.uploadVehicleDocuments(vehicleId: _currentVehicleId!, input: docsInput);
        }
      }
      developer.log('uploadDocumentPhotos(mobile) done');
    } catch (e) {
      developer.log('uploadDocumentPhotos error: $e');
      throw Exception('Failed to upload document photos: $e');
    }
  }

  @override
  Future<void> uploadSelfie(File photo) async {
    final userId = _getUserIdOrThrow();
    try {
 
      await _storageService.storePhoto(photo, StorageService.selfieType);

      // 1) Presign and upload to S3 (LocalStack)
      final contentType = _inferContentType(photo.path);
      final fileName = p.basename(photo.path);
      final key = _buildS3Key(userId, 'SELFIE', fileName);
      final url = await _repository.generatePresignedUrl(
        key: key,
        contentType: contentType,
      );
      final adjustedUrl = PresignedUrlUtil.adjustForDevice(url);
      final etag = await _uploadToS3(adjustedUrl, photo, contentType);

 
      try {
        await _repository.completeUploadBulk(keys: [key], type: 'USER');
      } catch (e) {
        developer.log('completeUploadBulk(selfie) failed: $e');
      }

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
      } catch (e) {

        developer.log('createUpload(selfie) skipped: $e');
      }


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
      } catch (_) {
  
      }
    } catch (e) {
      throw Exception('Failed to upload selfie: $e');
    }
  }

  @override
  Future<void> saveNotificationPreferences(
    Map<String, bool> preferences,
  ) async {
    try {
      final userId = _getUserIdOrThrow();
      await _repository.saveNotificationPreferences(
        userId: userId,
        preferences: preferences,
      );
    } catch (e) {
      throw Exception('Failed to save notification preferences: $e');
    }
  }

  @override
  Future<void> saveAppPreferences({
    required String theme,
    required String language,
  }) async {
    try {
      final userId = _getUserIdOrThrow();
      await _repository.saveAppPreferences(
        userId: userId,
        theme: theme,
        language: language,
      );
    } catch (e) {
      throw Exception('Failed to save app preferences: $e');
    }
  }

  @override
  Future<void> saveGpsPreference(bool enabled) async {
    try {
      await _repository.upsertUserPreference({'activateLocation': enabled});
    } catch (e) {
      throw Exception('Failed to save GPS preference: $e');
    }
  }

  @override
  Future<void> completeDriverOnboarding(Map<String, dynamic> data) async {
    final userId = _getUserIdOrThrow();
    try {
      final cgu = data['cgu_accepted'] == true;
      final privacy = data['privacy_policy_accepted'] == true;
      await _repository.upsertUserPreference({
        'cguAccepted': cgu,
        'privacyPolicyAccepted': privacy,
        'driverTermsAccepted': true,
      });
      await _repository.updateDriverStatus(
        userId: userId,
        input: {
          'isDriver': true,
        },
      );
    } catch (e) {
      throw Exception('Failed to complete driver onboarding: $e');
    }
  }

  @override
  Future<String> generateDriverQrCode({String? type}) async {
    try {
      return await _repository.generateDriverQrCode(type: type);
    } catch (e) {
      throw Exception('Failed to generate driver QR code: $e');
    }
  }

  @override
  Future<void> clearAllData() async {
    try {
      await _storageService.clearAllPhotos();
      _backendPersonalPhotos = 0;
      _backendVehiclePhotos = 0;
    } catch (e) {
      throw Exception('Failed to clear all data: $e');
    }
  }

 
  @override
  Future<void> refreshBackendPhotoCounts() async {
    final userId = _getUserIdOrThrow();
    try {
      final docs = await _repository.getUploadedDocuments(userId);
      // Expecting a response like: { files: [ { type: 'SELFIE' | 'ID_CARD_FRONT' | 'VEHICLE_REGISTRATION' | ... } ] }
      final List<dynamic> files = docs['files'] as List<dynamic>? ?? [];
      int personal = 0;
      int vehicle = 0;
      for (final f in files) {
        final type = (f is Map && f['type'] is String) ? (f['type'] as String) : '';
        switch (type) {
       
          case 'USER':
            personal += 1;
            break;
       
          case 'VEHICLE':
            vehicle += 1;
            break;
  
          case 'SELFIE':
          case 'ID_CARD_FRONT':
          case 'ID_CARD_BACK':
          case 'DRIVER_LICENSE':
            personal += 1;
            break;
          case 'VEHICLE_REGISTRATION':
          case 'REGISTRATION':
          case 'INSURANCE':
          case 'VEHICLE_PHOTO':
            vehicle += 1;
            break;
          default:
        
            try {
              final key = (f['key'] ?? '').toString().toUpperCase();
              if (key.contains('/DRIVER/SELFIE') ||
                  key.contains('ID_CARD') ||
                  key.contains('LICENSE') ||
                  key.contains('/USER/')) {
                personal += 1;
              } else if (key.contains('VEHICLE')) {
                vehicle += 1;
              }
            } catch (_) {}
            break;
        }
      }
      _backendPersonalPhotos = personal;
      _backendVehiclePhotos = vehicle;
    } catch (e) {
   
      throw Exception('Failed to refresh backend photo counts: $e');
    }
  }

  @override
  int get cachedPersonalPhotosCount => _backendPersonalPhotos;

  @override
  int get cachedVehiclePhotosCount => _backendVehiclePhotos;

  @override
  int get cachedTotalPhotosCount => _backendPersonalPhotos + _backendVehiclePhotos;

  @override
  int getTotalUploadedPhotosCount() {
    return _storageService.getTotalUploadedPhotosCount();
  }

  @override
  int getPersonalUploadedPhotosCount() {
    try {
      final types = <String>[
        'carteIdentiteRecto', 'carte_identite_recto',
        'carteIdentiteVerso', 'carte_identite_verso',
        'permisConduire', 'permis_conduire',
        StorageService.selfieType,
      ];
      int total = 0;
      for (final t in types) {
        total += _storageService.getPhotosForType(t).length;
      }
      return total;
    } catch (_) {
      return 0;
    }
  }

  @override
  int getVehicleUploadedPhotosCount() {
    try {
      final types = <String>[
        'certificatImmatriculation', 'certificat_immatriculation',
        'attestationAssurance', 'attestation_assurance',
        'photosVehicule', 'photos_vehicule',
      ];
      int total = 0;
      for (final t in types) {
        total += _storageService.getPhotosForType(t).length;
      }
      return total;
    } catch (_) {
      return 0;
    }
  }

  @override
  bool validatePersonalInfo(Map<String, dynamic> data) {
    final name = data['name']?.toString() ?? '';
    final email = data['email']?.toString() ?? '';
    final phone = data['phone']?.toString() ?? '';

    if (name.isEmpty || name.length < 2) return false;
    if (email.isEmpty || !_isValidEmail(email)) return false;
    if (phone.isEmpty || phone.length < 10) return false;

    return true;
  }

  @override
  bool validateVehicleInfo(Map<String, dynamic> data) {
    final marque = data['marque']?.toString() ?? '';
    final modele = data['modele']?.toString() ?? '';
    final immatriculation = data['immatriculation']?.toString() ?? '';

    if (marque.isEmpty || marque.length < 2) return false;
    if (modele.isEmpty || modele.length < 2) return false;
    if (immatriculation.isEmpty || immatriculation.length < 6) return false;

    return true;
  }

  @override
  bool validateDocuments() {
    try {
      // Prefer backend cache if available
      final backendCount = cachedTotalPhotosCount;
      if (backendCount > 0) return backendCount >= 3;
      return getTotalUploadedPhotosCount() >= 3;
    } catch (e) {
      return false;
    }
  }

  @override
  Future<void> updateOnboardingStep({
    required int currentStep,
    required Map<String, dynamic> stepData,
  }) async {
    final userId = _getUserIdOrThrow();
    try {
      await _repository.updateOnboardingStep(
        userId: userId,
        currentStep: currentStep,
        stepData: stepData,
      );
    } catch (e) {
      throw Exception('Failed to update onboarding step: $e');
    }
  }

  @override
  Future<void> setUserRole({required bool isDriver}) async {
    final userId = _getUserIdOrThrow();
    try {
      final roleName = isDriver ? 'DRIVER' : 'USER';
      developer.log('setUserRole start: userId=$userId, role=$roleName');
      await _repository.updateDriverStatus(
        userId: userId,
        input: {
          'isDriver': isDriver,
        },
      );
      developer.log('setUserRole success: userId=$userId, role=$roleName');
    } catch (e) {
      developer.log('setUserRole error: $e');
      throw Exception('Failed to set user role: $e');
    }
  }

  String _getUserIdOrThrow() {
    final id = _sessionService.userId;
    if (id == null || id.isEmpty) {
      throw StateError('Utilisateur non authentifié');
    }
    return id;
  }

  bool _isValidEmail(String email) {
    return RegExp(r'^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$').hasMatch(email);
  }
}
