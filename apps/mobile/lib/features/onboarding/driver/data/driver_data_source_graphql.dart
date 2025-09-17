import 'dart:developer' as developer;
import 'dart:developer' as developer;
import '../models/driver_onboarding_data.dart';
import 'driver_data_source_interface.dart';
import '../../../../api/graph-ql/graphql_client.dart';
import '../../../../api/graph-ql/queries.dart';
import '../../../../api/graph-ql/mutations.dart';

class DriverDataSourceGraphQL implements IDriverDataSource {
  final GraphQLClientWrapper _client;

  DriverDataSourceGraphQL(this._client);

  @override
  Future<Map<String, dynamic>> savePersonalInfo({
    required String userId,
    required String name,
    required String email,
    required String phone,
  }) async {
    final parts = name.trim().split(' ');
    final firstName = parts.isNotEmpty ? parts.first : '';
    final lastName = parts.length > 1 ? parts.sublist(1).join(' ').trim() : '';

    // Conform to server: UserUpdateInput requires StringFieldUpdateOperationsInput wrappers
    final variables = {
      'input': {
        'firstName': {'set': firstName},
        'lastName': {'set': lastName},
        'email': {'set': email},
        // Align with current GraphQL schema: use 'phone'
        'phone': {'set': phone},
      },
    };

    final response = await _client.executeMutation(
      document: updateUserMutation,
      document: updateUserMutation,
      variables: variables,
    );
    return response['updateUser'];
    return response['updateUser'];
  }

  @override
  Future<Map<String, dynamic>> saveVehicleInfo({
    required String userId,
    required String marque,
    required String modele,
    required String immatriculation,
    int? places,
    String? typeVehicule,
    int? places,
    String? typeVehicule,
  }) async {
    String? vehicleTypeId;
    List<dynamic>? vehicleTypes;
    if (typeVehicule != null && typeVehicule.trim().isNotEmpty) {
      try {
        final typesResp = await _client.executeQuery(
          document: getVehicleTypesQuery,
          variables: const {},
        );
        vehicleTypes = typesResp['vehicleTypes'] as List<dynamic>?;
        if (vehicleTypes != null) {
          final lower = typeVehicule.trim().toLowerCase();
          for (final t in vehicleTypes) {
            if (t is Map && (t['name']?.toString().toLowerCase() == lower)) {
              vehicleTypeId = t['id']?.toString();
              break;
            }
          }
        }
      } catch (_) {}
    }

    // Use first available type if no match found
    if ((vehicleTypeId == null || vehicleTypeId.isEmpty) &&
        vehicleTypes != null &&
        vehicleTypes.isNotEmpty) {
      for (final t in vehicleTypes) {
        if (t is Map && t['id'] != null) {
          vehicleTypeId = t['id'].toString();
          developer.log(
            'Using default vehicle type: ${t['name']} ($vehicleTypeId)',
          );
          break;
        }
      }
    }

    final input = <String, dynamic>{
      'brand': marque.isNotEmpty ? marque : 'Non spécifié',
      'model': modele.isNotEmpty ? modele : 'Non spécifié',
      'registrationNumber': immatriculation.isNotEmpty
          ? immatriculation
          : 'TEMP-${DateTime.now().millisecondsSinceEpoch}',
      'place': places ?? 4,
      'vehicleTypeId': vehicleTypeId ?? '',
    };

    // Ensure we have a vehicleTypeId
    if (input['vehicleTypeId'].toString().isEmpty) {
      throw Exception(
        'Impossible de créer le véhicule: aucun type de véhicule disponible',
      );
    }

    final variables = {'input': input};

    final response = await _client.executeMutation(
      document: createDriverVehicleMutation,
      document: createDriverVehicleMutation,
      variables: variables,
    );
    return response['createDriverVehicle'];
  }

  @override
  Future<Map<String, dynamic>> uploadDocument({
    required String userId,
    required String documentType,
    required String filePath,
    required String side,
  }) async {
    final variables = {
      'input': {
        'userId': userId,
        'documentType': documentType,
        'filePath': filePath,
        'side': side,
      },
    };

    final response = await _client.executeMutation(
      document: uploadDriverDocumentMutation,
      variables: variables,
    );
    return response['uploadDriverDocument'];
  }

  @override
  Future<Map<String, dynamic>> uploadSelfie({
    required String userId,
    required String filePath,
  }) async {
    final variables = {
      'input': {'userId': userId, 'filePath': filePath},
    };

    final response = await _client.executeMutation(
      document: uploadDriverSelfieMutation,
      variables: variables,
    );
    return response['uploadDriverSelfie'];
  }

  @override
  Future<Map<String, dynamic>> saveNotificationPreferences({
    required String userId,
    required Map<String, bool> preferences,
  }) async {
    final variables = {
      'input': {'userId': userId, 'preferences': preferences},
    };

    final response = await _client.executeMutation(
      document: saveDriverNotificationPreferencesMutation,
      variables: variables,
    );
    return response['saveDriverNotificationPreferences'];
  }

  @override
  Future<Map<String, dynamic>> saveAppPreferences({
    required String userId,
    required String theme,
    required String language,
  }) async {
    final variables = {
      'input': {'userId': userId, 'theme': theme, 'language': language},
    };

    final response = await _client.executeMutation(
      document: saveDriverAppPreferencesMutation,
      variables: variables,
    );
    return response['saveDriverAppPreferences'];
  }

  @override
  Future<Map<String, dynamic>> completeDriverOnboarding(String userId) async {
    final variables = {'userId': userId};

    final response = await _client.executeMutation(
      document: completeDriverOnboardingMutation,
      variables: variables,
    );
    return response['completeDriverOnboarding'];
  }

  @override
  Future<Map<String, dynamic>> getDriverOnboardingData(String userId) async {
    final variables = {'userId': userId};

    final response = await _client.executeQuery(
      document: getDriverOnboardingDataQuery,
      variables: variables,
    );
    return response['getDriverOnboardingData'];
  }

  @override
  Future<Map<String, dynamic>> updateDriverOnboardingData({
    required String userId,
    required DriverOnboardingData data,
  }) async {
    final variables = {
      'input': {'userId': userId, 'data': data},
    };

    final response = await _client.executeMutation(
      document: updateDriverOnboardingStepMutation,
      variables: variables,
    );
    return response['updateDriverOnboardingStep'];
  }

  @override
  Future<Map<String, dynamic>> getDocumentValidationStatus(
    String userId,
  ) async {
    final variables = {'userId': userId};

    final response = await _client.executeQuery(
      document: getDriverDocumentsQuery,
      variables: variables,
    );
    return response['getDriverDocuments'];
  }

  @override
  Future<Map<String, dynamic>> getUploadedDocuments(String userId) async {
    final variables = {'userId': userId};

    final response = await _client.executeQuery(
      document: getDriverDocumentsQuery,
      variables: variables,
    );

    final files =
        response['files'] ?? response['getDriverDocuments'] ?? <dynamic>[];
    if (files is List) {
      return {'files': files};
    }
    return {'files': <dynamic>[]};
  }

  @override
  Future<Map<String, dynamic>> deleteDocument({
    required String userId,
    required String documentId,
  }) async {
    throw UnimplementedError('Delete document not implemented yet');
  }

  @override
  Future<Map<String, dynamic>> updateOnboardingStep({
    required String userId,
    required int currentStep,
    required Map<String, dynamic> stepData,
  }) async {
    final variables = {
      'input': {
        'userId': userId,
        'currentStep': currentStep,
        'stepData': stepData,
      },
    };

    final response = await _client.executeMutation(
      document: updateDriverOnboardingStepMutation,
      variables: variables,
    );
    return response['updateDriverOnboardingStep'];
  }

  @override
  Future<Map<String, dynamic>> validateDriverInfo({
    required String userId,
    required Map<String, dynamic> driverInfo,
  }) async {
    throw UnimplementedError('Validate driver info not implemented yet');
  }

  @override
  Future<Map<String, dynamic>> getDriverStats(String userId) async {
    final variables = {'userId': userId};

    final response = await _client.executeQuery(
      document: getDriverStatsQuery,
      variables: variables,
    );
    return response['getDriverStats'];
  }

  @override
  Future<Map<String, dynamic>> updateDriverProfile({
    required String userId,
    Map<String, dynamic>? personalInfo,
    Map<String, dynamic>? vehicleInfo,
    Map<String, dynamic>? preferences,
  }) async {
    if (personalInfo != null) {
      return await savePersonalInfo(
        userId: userId,
        name: personalInfo['name'] ?? '',
        email: personalInfo['email'] ?? '',
        phone: personalInfo['phone'] ?? '',
      );
    }

    if (vehicleInfo != null) {
      return await saveVehicleInfo(
        userId: userId,
        marque: vehicleInfo['marque'] ?? '',
        modele: vehicleInfo['modele'] ?? '',
        immatriculation: vehicleInfo['immatriculation'] ?? '',
        places: int.tryParse((vehicleInfo['places'] ?? '').toString()),
        typeVehicule: vehicleInfo['type'] ?? vehicleInfo['typeVehicule'],
        places: int.tryParse((vehicleInfo['places'] ?? '').toString()),
        typeVehicule: vehicleInfo['type'] ?? vehicleInfo['typeVehicule'],
      );
    }

    if (preferences != null) {
      return await saveAppPreferences(
        userId: userId,
        theme: preferences['theme'] ?? 'clair',
        language: preferences['language'] ?? 'fr',
      );
    }

    throw Exception('No data to update');
  }

  @override
  Future<String> generatePresignedUrl({
    required String key,
    required String contentType,
    double? expiresIn,
  }) async {
    final variables = {
      'key': key,
      'contentType': contentType,
      if (expiresIn != null) 'expiresIn': expiresIn,
    };
    final response = await _client.executeMutation(
      document: getPresignedUrlMutation,
      variables: variables,
    );
    final url = response['getPresignedUrl'];
    if (url is String && url.isNotEmpty) return url;
    throw Exception('Failed to generate presigned URL');
  }

  @override
  Future<List<Map<String, dynamic>>> createBatchPresignedUrls({
    required String type,
    required List<Map<String, String>> files,
  }) async {
    final variables = {'type': type, 'files': files};
    final response = await _client.executeMutation(
      document: createBatchPresignedUrlsMutation,
      variables: variables,
    );
    final list = response['createBatchPresignedUrls'];
    if (list is List) {
      return list.cast<Map<String, dynamic>>();
    }
    throw Exception('Failed to create batch presigned urls');
  }

  @override
  Future<List<Map<String, dynamic>>> completeUploadBulk({
    required List<String> keys,
    required String type,
  }) async {
    final variables = {'keys': keys, 'type': type};
    final response = await _client.executeMutation(
      document: completeUploadBulkMutation,
      variables: variables,
    );
    final list = response['completeUploadBulk'];
    if (list is List) return list.cast<Map<String, dynamic>>();
    throw Exception('Failed to complete upload bulk');
  }

  @override
  Future<Map<String, dynamic>> createUpload({
    required String userId,
    required String documentType,
    required String key,
    required String url,
    required int size,
    String? originalName,
    String? contentType,
    String? etag,
    String? driverVehicleId,
  }) async {
    final input = <String, dynamic>{
      'key': key,
      'url': url,
      'size': size,
      // Ensure a valid FileType value on backend
      'type': 'USER',
      'userId': userId,
    };
    if (originalName != null) input['originalName'] = originalName;
    if (contentType != null) input['contentType'] = contentType;
    if (etag != null) input['etag'] = etag;
    if (driverVehicleId != null) input['driverVehicleId'] = driverVehicleId;
    final response = await _client.executeMutation(
      document: createFileMutation,
      variables: {'input': input},
    );
    return response['createFile'] as Map<String, dynamic>;
  }

  @override
  Future<Map<String, dynamic>> uploadUserDocuments({
    required List<Map<String, dynamic>> input,
  }) async {
    final variables = {'input': input};
    final response = await _client.executeMutation(
      document: uploadUserDocumentMutation,
      variables: variables,
    );
    return response['uploadUserDocument'] as Map<String, dynamic>;
  }

  @override
  Future<List<Map<String, dynamic>>> uploadVehicleImages({
    required String vehicleId,
    required List<String> keys,
  }) async {
    final variables = {'vehicleId': vehicleId, 'keys': keys};
    final response = await _client.executeMutation(
      document: uploadVehicleImagesMutation,
      variables: variables,
    );
    final list = response['uploadVehicleImages'];
    if (list is List) return list.cast<Map<String, dynamic>>();
    throw Exception('Failed to upload vehicle images');
  }

  @override
  Future<List<Map<String, dynamic>>> uploadVehicleDocuments({
    required String vehicleId,
    required List<Map<String, dynamic>> input,
  }) async {
    final variables = {'vehicleId': vehicleId, 'input': input};
    final response = await _client.executeMutation(
      document: uploadVehicleDocumentsMutation,
      variables: variables,
    );
    final list = response['uploadVehicleDocuments'];
    if (list is List) return list.cast<Map<String, dynamic>>();
    throw Exception('Failed to upload vehicle documents');
  }

  @override
  Future<String> generateDriverQrCode({String? type}) async {
    // Utilise la mutation pour créer et stocker un QR unique, puis renvoyer l'image (data URL)
    final response = await _client.executeMutation(
      document: createUserQrMutation,
      variables: {'type': (type == null || type.isEmpty) ? 'png' : type},
    );
    final data = response['createUserQr'];
    if (data is String && data.isNotEmpty) return data;
    throw Exception('Failed to generate driver QR code');
  }

  @override
  Future<Map<String, dynamic>> updateDriverStatus({
    required String userId,
    required Map<String, dynamic> input,
  }) async {
    final isDriver = input['isDriver'] ?? false;
    final roleName = isDriver ? 'DRIVER' : 'USER';

    // Step 1 — clear existing roles (exclusive assignment)
    await _client.executeMutation(
      document: updateUserMutation,
      variables: {
        'input': {
          'Role': {'set': []},
        },
      },
    );

    // Step 2 — connect or create the desired role
    final response = await _client.executeMutation(
      document: updateUserMutation,
      variables: {
        'input': {
          'Role': {
            'connectOrCreate': [
              {
                'where': {'name': roleName},
                'create': {'name': roleName},
              },
            ],
          },
        },
      },
    );

    final updated = response['updateUser'];
    if (updated is Map<String, dynamic>) {
      return updated;
    }

    final msg = (response['message'] ?? 'Failed to update user role')
        .toString();
    throw Exception('updateDriverStatus failed: $msg');
  }

  @override
  Future<Map<String, dynamic>> upsertUserPreference(
    Map<String, dynamic> input,
  ) async {
    final response = await _client.executeMutation(
      document: upsertUserPreferenceMutation,
      variables: {'input': input},
    );
    return response['upsertUserPreference'] as Map<String, dynamic>;
  }
}
