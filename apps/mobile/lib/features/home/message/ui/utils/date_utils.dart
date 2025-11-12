class DateUtils {
  String formatMessageTime(String timestamp) {
    final date = _parseDate(timestamp);
    final now = DateTime.now();
    final difference = now.difference(date);

    if (difference.inDays == 0) return "Aujourd'hui";
    if (difference.inDays == 1) return "Hier";
    if (difference.inDays < 7) return "Il y a ${difference.inDays} jours";
    return "${date.day}/${date.month}/${date.year}";
  }

  String formatTime(String timestamp) {
    final date = _parseDate(timestamp);
    return '${date.hour.toString().padLeft(2, '0')}:${date.minute.toString().padLeft(2, '0')}';
  }

  DateTime _parseDate(String dateString) {
    try {
      return DateTime.parse(dateString).toLocal();
    } catch (e) {
      return DateTime.now();
    }
  }

  bool shouldShowTime(List<dynamic> messages, int index) {
    if (index == 0) return true;
    if (index == messages.length - 1) return true;

    final currentMessage = messages[index];
    final previousMessage = messages[index - 1];
    final currentTime = _parseDate(currentMessage['createdAt'] ?? '');
    final previousTime = _parseDate(previousMessage['createdAt'] ?? '');
    final timeDifference = currentTime.difference(previousTime).abs();

    return timeDifference.inMinutes > 5;
  }
}
