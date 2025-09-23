class DriverValidators {
  static bool isValidEmail(String email) {
    return RegExp(r'^[\w\.-]+@([\w-]+\.)+[\w-]{2,4}$').hasMatch(email);
  }

  static bool validatePersonalInfo(Map<String, dynamic> data) {
    final name = data['name']?.toString() ?? '';
    final email = data['email']?.toString() ?? '';
    final phone = data['phone']?.toString() ?? '';

    if (name.isEmpty || name.length < 2) return false;
    if (email.isEmpty || !isValidEmail(email)) return false;
    if (phone.isEmpty || phone.length < 10) return false;

    return true;
  }

  static bool validateVehicleInfo(Map<String, dynamic> data) {
    final marque = data['marque']?.toString() ?? '';
    final modele = data['modele']?.toString() ?? '';
    final immatriculation = data['immatriculation']?.toString() ?? '';

    if (marque.isEmpty || marque.length < 2) return false;
    if (modele.isEmpty || modele.length < 2) return false;
    if (immatriculation.isEmpty || immatriculation.length < 6) return false;

    return true;
  }
}
