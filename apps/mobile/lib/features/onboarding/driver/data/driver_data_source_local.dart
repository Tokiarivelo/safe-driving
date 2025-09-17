import '../models/driver_onboarding_data.dart';
import 'driver_data_source_interface.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';

class DriverDataSourceLocal implements IDriverDataSource {
  final Map<String, dynamic> _store = {};

  @override
  Future<Map<String, dynamic>> savePersonalInfo({
    required String userId,
    required String name,
    required String email,
    required String phone,
  }) async {
    _store['personal_info'] = {
      'userId': userId,
      'name': name,
      'email': email,
      'phone': phone,
    };
    return {'success': true, 'message': 'Saved locally'};
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
    _store['vehicle_info'] = {
      'userId': userId,
      'marque': marque,
      'modele': modele,
      'immatriculation': immatriculation,
      'places': places,
      'typeVehicule': typeVehicule,
    };
    return {'success': true, 'message': 'Saved locally'};
  }

  @override
  Future<Map<String, dynamic>> uploadDocument({
    required String userId,
    required String documentType,
    required String filePath,
    required String side,
  }) async {
    final docs = (_store['documents'] as List<Map<String, dynamic>>?) ?? [];
    final id = 'local_doc_${docs.length + 1}';
    final doc = {
      'id': id,
      'userId': userId,
      'documentType': documentType,
      'filePath': filePath,
      'side': side,
    };
    docs.add(doc);
    _store['documents'] = docs;
    return {
      'success': true,
      'message': 'Stored locally',
      'data': {'id': id},
    };
  }

  @override
  Future<Map<String, dynamic>> uploadSelfie({
    required String userId,
    required String filePath,
  }) async {
    _store['selfie'] = {
      'userId': userId,
      'filePath': filePath,
      'id': 'local_selfie_1',
    };
    _store['selfie'] = {
      'userId': userId,
      'filePath': filePath,
      'id': 'local_selfie_1',
    };
    return {
      'success': true,
      'message': 'Stored locally',
      'data': {'id': 'local_selfie_1'},
    };
  }

  @override
  Future<Map<String, dynamic>> saveNotificationPreferences({
    required String userId,
    required Map<String, bool> preferences,
  }) async {
    _store['notification_preferences'] = {
      'userId': userId,
      'preferences': preferences,
    };
    _store['notification_preferences'] = {
      'userId': userId,
      'preferences': preferences,
    };
    return {'success': true, 'message': 'Saved locally'};
  }

  @override
  Future<Map<String, dynamic>> saveAppPreferences({
    required String userId,
    required String theme,
    required String language,
  }) async {
    _store['app_preferences'] = {
      'userId': userId,
      'theme': theme,
      'language': language,
    };
    _store['app_preferences'] = {
      'userId': userId,
      'theme': theme,
      'language': language,
    };
    return {'success': true, 'message': 'Saved locally'};
  }

  @override
  Future<Map<String, dynamic>> completeDriverOnboarding(String userId) async {
    _store['completed'] = true;
    return {'success': true, 'message': 'Completed locally'};
  }

  @override
  Future<Map<String, dynamic>> getDriverOnboardingData(String userId) async {
    return {'success': true, 'data': _store};
    return {'success': true, 'data': _store};
  }

  @override
  Future<Map<String, dynamic>> updateDriverOnboardingData({
    required String userId,
    required DriverOnboardingData data,
  }) async {
    _store['onboarding_data'] = data;
    return {'success': true, 'message': 'Updated locally'};
  }

  @override
  Future<Map<String, dynamic>> getDocumentValidationStatus(
    String userId,
  ) async {
  Future<Map<String, dynamic>> getDocumentValidationStatus(
    String userId,
  ) async {
    return {
      'success': true,
      'data': {'status': 'pending'},
    };
  }

  @override
  Future<Map<String, dynamic>> getUploadedDocuments(String userId) async {
    return {
      'success': true,
      'data': (_store['documents'] as List<Map<String, dynamic>>?) ?? [],
    };
  }

  @override
  Future<Map<String, dynamic>> deleteDocument({
    required String userId,
    required String documentId,
  }) async {
    final docs = (_store['documents'] as List<Map<String, dynamic>>?) ?? [];
    docs.removeWhere((d) => d['id'] == documentId);
    _store['documents'] = docs;
    return {'success': true, 'message': 'Deleted locally'};
  }

  @override
  Future<Map<String, dynamic>> updateOnboardingStep({
    required String userId,
    required int currentStep,
    required Map<String, dynamic> stepData,
  }) async {
    final steps = (_store['steps'] as Map<String, dynamic>?) ?? {};
    steps['currentStep'] = currentStep;
    steps['data'] = stepData;
    _store['steps'] = steps;
    return {'success': true, 'message': 'Updated locally'};
  }

  @override
  Future<Map<String, dynamic>> validateDriverInfo({
    required String userId,
    required Map<String, dynamic> driverInfo,
  }) async {
    return {'success': true, 'message': 'Validated locally'};
  }

  @override
  Future<Map<String, dynamic>> getDriverStats(String userId) async {
    return {
      'success': true,
      'data': {'rides': 0, 'rating': 0},
      'data': {'rides': 0, 'rating': 0},
    };
  }

  @override
  Future<Map<String, dynamic>> updateDriverProfile({
    required String userId,
    Map<String, dynamic>? personalInfo,
    Map<String, dynamic>? vehicleInfo,
    Map<String, dynamic>? preferences,
  }) async {
    if (personalInfo != null) _store['personal_info'] = personalInfo;
    if (vehicleInfo != null) _store['vehicle_info'] = vehicleInfo;
    if (preferences != null) _store['app_preferences'] = preferences;
    return {'success': true, 'message': 'Updated locally'};
  }

  @override
  Future<String> generatePresignedUrl({
    required String key,
    required String contentType,
    double? expiresIn,
  }) async {
    _store['last_presigned'] = {
      'key': key,
      'contentType': contentType,
      'expiresIn': expiresIn,
    };
    return 'https://local.presigned.url/$key';
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
    final uploads = (_store['uploads'] as List<Map<String, dynamic>>?) ?? [];
    final id = 'local_upload_${uploads.length + 1}';
    final data = {
      'id': id,
      'userId': userId,
      'type': documentType,
      'key': key,
      'url': url,
      'size': size,
      'originalName': originalName,
      'contentType': contentType,
      'etag': etag,
      'driverVehicleId': driverVehicleId,
      'status': 'STORED',
    };
    uploads.add(data);
    _store['uploads'] = uploads;
    return data;
  }

  @override
  Future<String> generateDriverQrCode({String? type}) async {
    final t = type ?? 'driver';
    _store['qr_type'] = t;
    return 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=local-$t-qr';
  }

  @override
  Future<Map<String, dynamic>> updateDriverStatus({
    required String userId,
    required Map<String, dynamic> input,
  }) async {
    _store['driver_status'] = {'userId': userId, ...input};
    return {'id': userId, ...input};
  }

  @override
  Future<Map<String, dynamic>> upsertUserPreference(
    Map<String, dynamic> input,
  ) async {
    _store['user_preference'] = input;
    return {'id': 'local_pref_1', ...input};
  }
}
