class MessageModels {
  final String sender;
  final String content;
  final String time;
  final bool unread;

  MessageModels({
    required this.sender,
    required this.content,
    required this.time,
    required this.unread,
  });

  Map<String, dynamic> toMap() {
    return {
      'sender': sender,
      'content': content,
      'time': time,
      'unread': unread,
    };
  }

  factory MessageModels.fromMap(Map<String, dynamic> map) {
    return MessageModels(
      sender: map['sender'],
      content: map['content'],
      time: map['time'],
      unread: map['unread'],
    );
  }
}
