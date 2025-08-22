abstract class RepositoryInterface {
  Future<void> initialize();

  Future<void> dispose();
  Future<bool> isConnected();

  Future<bool> testConnection();
}
