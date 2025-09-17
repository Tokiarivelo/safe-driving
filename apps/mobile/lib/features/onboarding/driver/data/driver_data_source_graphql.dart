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
      variables: variables,
    );
    return response['updateUser'];
  }

  @override
  Future<Map<String, dynamic>> saveVehicleInfo({
    required String userId,
    required String marque,
    required String modele,
    required String immatriculation,
    required String couleur,
    required int annee,
  }) async {
    final variables = {
      'input': {
        'userId': userId,
        'marque': marque,
        'modele': modele,
        'immatriculation': immatriculation,
        'couleur': couleur,
        'annee': annee,
      },
    };

    final response = await _client.executeMutation(
      document: saveDriverVehicleInfoMutation,
      variables: variables,
    );
    return response['saveDriverVehicleInfo'];
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
    return response['getDriverDocuments'];
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
        couleur: vehicleInfo['couleur'] ?? '',
        annee: vehicleInfo['annee'] ?? 0,
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
    final payload = {'input': {'id': userId, ...input}};
    final response = await _client.executeMutation(
      document: updateUserMutation,
      variables: payload,
    );
    return response['updateUser'] as Map<String, dynamic>;
  }

  @override
  Future<Map<String, dynamic>> upsertUserPreference(Map<String, dynamic> input) async {
    final response = await _client.executeMutation(
      document: upsertUserPreferenceMutation,
      variables: {'input': input},
    );
    return response['upsertUserPreference'] as Map<String, dynamic>;
  }
}
