import '../models/driver_onboarding_data.dart';
import '../data/driver_data_source_interface.dart';
import '../../../../core/repositories/repository_interface.dart';

class DriverRepository implements RepositoryInterface {
  final IDriverDataSource _dataSource;

  DriverRepository(this._dataSource);

  @override
  Future<void> initialize() async {
    // Repository initialization logic if needed
  }

  @override
  Future<void> dispose() async {
    // Repository cleanup logic if needed
  }

  @override
  Future<bool> isConnected() async {
    return true;
  }

  @override
  Future<bool> testConnection() async {
    return true;
  }

  Future<void> savePersonalInfo({
    required String userId,
    required String name,
    required String email,
    required String phone,
  }) async {
    try {
      await _dataSource.savePersonalInfo(
        userId: userId,
        name: name,
        email: email,
        phone: phone,
      );
    } catch (e) {
      throw Exception('Failed to save personal info: $e');
    }
  }

  Future<void> saveVehicleInfo({
    required String userId,
    required String marque,
    required String modele,
    required String immatriculation,
    int? places,
    String? typeVehicule,
  }) async {
    try {
      await _dataSource.saveVehicleInfo(
        userId: userId,
        marque: marque,
        modele: modele,
        immatriculation: immatriculation,
        places: places,
        typeVehicule: typeVehicule,
      );
    } catch (e) {
      throw Exception('Failed to save vehicle info: $e');
    }
  }

  Future<String> uploadDocument({
    required String userId,
    required String documentType,
    required String filePath,
    required String side,
  }) async {
    try {
      final result = await _dataSource.uploadDocument(
        userId: userId,
        documentType: documentType,
        filePath: filePath,
        side: side,
      );
      return result['data']['id'] ?? '';
    } catch (e) {
      throw Exception('Failed to upload document: $e');
    }
  }

  Future<String> uploadSelfie({
    required String userId,
    required String filePath,
  }) async {
    try {
      final result = await _dataSource.uploadSelfie(
        userId: userId,
        filePath: filePath,
      );
      return result['data']['id'] ?? '';
    } catch (e) {
      throw Exception('Failed to upload selfie: $e');
    }
  }

  Future<String> generatePresignedUrl({
    required String key,
    required String contentType,
    double? expiresIn,
  }) async {
    try {
      return await _dataSource.generatePresignedUrl(
        key: key,
        contentType: contentType,
        expiresIn: expiresIn,
      );
    } catch (e) {
      throw Exception('Failed to generate presigned url: $e');
    }
  }

  Future<List<Map<String, dynamic>>> createBatchPresignedUrls({
    required String type,
    required List<Map<String, String>> files,
  }) async {
    try {
      return await _dataSource.createBatchPresignedUrls(
        type: type,
        files: files,
      );
    } catch (e) {
      throw Exception('Failed to create batch presigned urls: $e');
    }
  }

  Future<List<Map<String, dynamic>>> completeUploadBulk({
    required List<String> keys,
    required String type,
  }) async {
    try {
      return await _dataSource.completeUploadBulk(
        keys: keys,
        type: type,
      );
    } catch (e) {
      throw Exception('Failed to complete upload bulk: $e');
    }
  }

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
    try {
      return await _dataSource.createUpload(
        userId: userId,
        documentType: documentType,
        key: key,
        url: url,
        size: size,
        originalName: originalName,
        contentType: contentType,
        etag: etag,
        driverVehicleId: driverVehicleId,
      );
    } catch (e) {
      throw Exception('Failed to create upload: $e');
    }
  }

  Future<Map<String, dynamic>> uploadUserDocuments({
    required List<Map<String, dynamic>> input,
  }) async {
    try {
      return await _dataSource.uploadUserDocuments(input: input);
    } catch (e) {
      throw Exception('Failed to attach user documents: $e');
    }
  }

  Future<List<Map<String, dynamic>>> uploadVehicleImages({
    required String vehicleId,
    required List<String> keys,
  }) async {
    try {
      return await _dataSource.uploadVehicleImages(vehicleId: vehicleId, keys: keys);
    } catch (e) {
      throw Exception('Failed to attach vehicle images: $e');
    }
  }

  Future<List<Map<String, dynamic>>> uploadVehicleDocuments({
    required String vehicleId,
    required List<Map<String, dynamic>> input,
  }) async {
    try {
      return await _dataSource.uploadVehicleDocuments(vehicleId: vehicleId, input: input);
    } catch (e) {
      throw Exception('Failed to attach vehicle documents: $e');
    }
  }

  Future<String> generateDriverQrCode({String? type}) async {
    try {
      return await _dataSource.generateDriverQrCode(type: type);
    } catch (e) {
      throw Exception('Failed to generate driver QR code: $e');
    }
  }

  Future<void> updateDriverStatus({
    required String userId,
    required Map<String, dynamic> input,
  }) async {
    try {
      await _dataSource.updateDriverStatus(userId: userId, input: input);
    } catch (e) {
      throw Exception('Failed to update driver status: $e');
    }
  }

  Future<void> upsertUserPreference(Map<String, dynamic> input) async {
    try {
      await _dataSource.upsertUserPreference(input);
    } catch (e) {
      throw Exception('Failed to upsert user preference: $e');
    }
  }

  Future<void> saveNotificationPreferences({
    required String userId,
    required Map<String, bool> preferences,
  }) async {
    try {
      await _dataSource.saveNotificationPreferences(
        userId: userId,
        preferences: preferences,
      );
    } catch (e) {
      throw Exception('Failed to save notification preferences: $e');
    }
  }

  Future<void> saveAppPreferences({
    required String userId,
    required String theme,
    required String language,
  }) async {
    try {
      await _dataSource.saveAppPreferences(
        userId: userId,
        theme: theme,
        language: language,
      );
    } catch (e) {
      throw Exception('Failed to save app preferences: $e');
    }
  }

  Future<void> completeDriverOnboarding(String userId) async {
    try {
      await _dataSource.completeDriverOnboarding(userId);
    } catch (e) {
      throw Exception('Failed to complete driver onboarding: $e');
    }
  }

  Future<DriverOnboardingData?> getDriverOnboardingData(String userId) async {
    throw UnimplementedError('getDriverOnboardingData not implemented yet');
  }

  Future<void> updateDriverOnboardingData({
    required String userId,
    required DriverOnboardingData data,
  }) async {
    throw UnimplementedError('updateDriverOnboardingData not implemented yet');
  }

  Future<Map<String, String>> getDocumentValidationStatus(String userId) async {
    throw UnimplementedError('getDocumentValidationStatus not implemented yet');
  }

  Future<Map<String, dynamic>> getUploadedDocuments(String userId) async {
    try {
      return await _dataSource.getUploadedDocuments(userId);
    } catch (e) {
      throw Exception('Failed to fetch uploaded documents: $e');
    }
  }

  Future<void> deleteDocument({
    required String userId,
    required String documentId,
  }) async {
    await _dataSource.deleteDocument(userId: userId, documentId: documentId);
  }

  Future<void> updateOnboardingStep({
    required String userId,
    required int currentStep,
    required Map<String, dynamic> stepData,
  }) async {
    try {
      await _dataSource.updateOnboardingStep(
        userId: userId,
        currentStep: currentStep,
        stepData: stepData,
      );
    } catch (e) {
      throw Exception('Failed to update onboarding step: $e');
    }
  }

  Future<Map<String, String?>> validateDriverInfo({
    required String userId,
    required Map<String, dynamic> driverInfo,
  }) async {
    throw UnimplementedError('validateDriverInfo not implemented yet');
  }

  Future<Map<String, dynamic>> getDriverStats(String userId) async {
    throw UnimplementedError('getDriverStats not implemented yet');
  }

  Future<void> updateDriverProfile({
    required String userId,
    Map<String, dynamic>? personalInfo,
    Map<String, dynamic>? vehicleInfo,
    Map<String, dynamic>? preferences,
  }) async {
    throw UnimplementedError('updateDriverProfile not implemented yet');
  }
}
