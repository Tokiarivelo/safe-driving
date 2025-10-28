class MessageModels {
  final String id;
  final String content;
  final String senderId;
  final String sender;
  final DateTime createdAt;
  final bool unread;
  final String? conversationId;
  final String? rideId;
  final List<MessageModels> replies;

  MessageModels({
    required this.id,
    required this.content,
    required this.senderId,
    required this.sender,
    required this.createdAt,
    this.unread = false,
    this.conversationId,
    this.rideId,
    this.replies = const [],
  });

  String get time {
    final now = DateTime.now();
    final difference = now.difference(createdAt);

    if (difference.inMinutes < 1) return 'Maintenant';
    if (difference.inHours < 1) return '${difference.inMinutes}min';
    if (difference.inDays < 1) return '${difference.inHours}h';
    if (difference.inDays < 7) return '${difference.inDays}j';

    return '${createdAt.day}/${createdAt.month}/${createdAt.year}';
  }

  factory MessageModels.fromJson(Map<String, dynamic> json) {
    return MessageModels(
      id: json['id'] ?? '',
      content: json['content'] ?? '',
      senderId: json['senderId'] ?? '',
      sender: json['sender'] != null
          ? '${json['sender']['firstName']} ${json['sender']['lastName']}'
          : 'Utilisateur inconnu',
      createdAt: json['createdAt'] != null
          ? DateTime.parse(json['createdAt'])
          : DateTime.now(),
      unread: json['readAt'] == null,
      conversationId: json['conversationId'],
      rideId: json['rideId'],
      replies: (json['replies'] as List? ?? [])
          .map((reply) => MessageModels.fromJson(reply))
          .toList(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'content': content,
      'senderId': senderId,
      'sender': sender,
      'createdAt': createdAt.toIso8601String(),
      'unread': unread,
      'conversationId': conversationId,
      'rideId': rideId,
    };
  }
}
