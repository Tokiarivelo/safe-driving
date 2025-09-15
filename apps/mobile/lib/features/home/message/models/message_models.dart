class MessageModels {
  final String sender;
  final String content;
  final String time;
  final bool unread;

  MessageModels({
    required this.sender,
    required this.content,
    required this.time,
    this.unread = false,
  });
}
