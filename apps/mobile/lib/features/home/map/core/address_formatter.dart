class AddressFormatter {
  static String format({String? road, String? neighbourhood, String? label}) {
    final r = (road ?? '').trim();
    final n = (neighbourhood ?? '').trim();
    if (r.isNotEmpty && n.isNotEmpty) return '$r, $n';
    if (r.isNotEmpty) return r;
    if (n.isNotEmpty) return n;
    return label?.trim().isNotEmpty == true ? label!.trim() : 'Unnamed place';
  }
}
