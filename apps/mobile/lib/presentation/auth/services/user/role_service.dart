import '../../models/auth_models.dart';
import '../../../../api/graphql/queries.dart';
import '../core/graphql_client_service.dart';

class RoleService {
  final GraphQLClientService _graphQLClient;

  RoleService(this._graphQLClient);

  Future<List<Role>> getRoles() async {
    final data = await _graphQLClient.query(getRolesQuery);
    final roles = data['roles'] as List;
    return roles.map((r) => Role.fromJson(r)).toList();
  }
}
