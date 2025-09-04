import '../models/driver_onboarding_data.dart';
import 'driver_data_source_interface.dart';

/// Local/offline implementation of IDriverDataSource.
/// Returns simple success maps to allow the UI to function without a backend.
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
    required String couleur,
    required int annee,
  }) async {
    _store['vehicle_info'] = {
      'userId': userId,
      'marque': marque,
      'modele': modele,
      'immatriculation': immatriculation,
      'couleur': couleur,
      'annee': annee,
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
    _store['selfie'] = {'userId': userId, 'filePath': filePath, 'id': 'local_selfie_1'};
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
    _store['notification_preferences'] = {'userId': userId, 'preferences': preferences};
    return {'success': true, 'message': 'Saved locally'};
  }

  @override
  Future<Map<String, dynamic>> saveAppPreferences({
    required String userId,
    required String theme,
    required String language,
  }) async {
    _store['app_preferences'] = {'userId': userId, 'theme': theme, 'language': language};
    return {'success': true, 'message': 'Saved locally'};
  }

  @override
  Future<Map<String, dynamic>> completeDriverOnboarding(String userId) async {
    _store['completed'] = true;
    return {'success': true, 'message': 'Completed locally'};
  }

  @override
  Future<Map<String, dynamic>> getDriverOnboardingData(String userId) async {
    return {
      'success': true,
      'data': _store,
    };
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
  Future<Map<String, dynamic>> getDocumentValidationStatus(String userId) async {
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
      'data': {
        'rides': 0,
        'rating': 0,
      },
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
}

