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
    final variables = {
      'input': {
        'id': userId,
        'firstName': firstName,
        'lastName': lastName,
        'email': email,
        'phoneNumber': phone,
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
          final wanted = _canonicalVehicleName(typeVehicule);
          for (final t in vehicleTypes) {
            if (t is Map) {
              final name = (t['name']?.toString() ?? '');
              final canon = _canonicalVehicleName(name);
              if (canon == wanted) {
                vehicleTypeId = t['id']?.toString();
                break;
              }
            }
          }
        }
      } catch (_) {}
    }

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

    if (input['vehicleTypeId'].toString().isEmpty) {
      throw Exception(
        'Impossible de créer le véhicule: aucun type de véhicule disponible',
      );
    }

    final variables = {'input': input};

    final response = await _client.executeMutation(
      document: createDriverVehicleMutation,
      variables: variables,
    );
    return response['createDriverVehicle'];
  }

  String _normalizeName(String s) {
    var r = s.toLowerCase();
    r = r
        .replaceAll('à', 'a')
        .replaceAll('á', 'a')
        .replaceAll('â', 'a')
        .replaceAll('ä', 'a');
    r = r.replaceAll('ç', 'c');
    r = r
        .replaceAll('è', 'e')
        .replaceAll('é', 'e')
        .replaceAll('ê', 'e')
        .replaceAll('ë', 'e');
    r = r.replaceAll('î', 'i').replaceAll('ï', 'i');
    r = r.replaceAll('ô', 'o').replaceAll('ö', 'o');
    r = r.replaceAll('û', 'u').replaceAll('ü', 'u');
    r = r.replaceAll('-', ' ').replaceAll('_', ' ');
    r = r.replaceAll(RegExp(r'\s+'), ' ');
    return r.trim();
  }

  String _canonicalVehicleName(String s) {
    final n = _normalizeName(s).replaceAll(' ', '');
    if (n == 'car' || n == 'auto' || n == 'automobile') return 'voiture';
    if (n == 'voiture') return 'voiture';

    if (n == 'motorcycle' || n == 'motorbike') return 'moto';
    if (n == 'moto') return 'moto';

    if (n == 'bike' || n == 'bicycle') return 'velo';
    if (n == 'velo' || n == 'vélo') return 'velo';

    if (n == 'tuktuk' || n == 'tuktuktuk' || n == 'tuk') return 'tuktuk';
    if (n.contains('tuk')) return 'tuktuk';

    return n;
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
      'type': documentType,
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
  Future<String> generateDriverQrCode({String? type}) async {
    final response = await _client.executeQuery(
      document: getUserQrQuery,
      variables: {'type': type ?? 'driver'},
    );
    final data = response['getUserQr'];
    if (data is String && data.isNotEmpty) return data;
    throw Exception('Failed to generate driver QR code');
  }

  @override
  Future<Map<String, dynamic>> updateDriverStatus({
    required String userId,
    required Map<String, dynamic> input,
  }) async {
    final payload = {
      'input': {'id': userId, ...input},
    };
    final response = await _client.executeMutation(
      document: updateUserMutation,
      variables: payload,
    );
    return response['updateUser'] as Map<String, dynamic>;
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
