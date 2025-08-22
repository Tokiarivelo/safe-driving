class UserImage {
  final String id;
  final String url;
  final String type;
  final String userId;

  UserImage({
    required this.id,
    required this.url,
    required this.type,
    required this.userId,
  });

  factory UserImage.fromJson(Map<String, dynamic> json) {
    return UserImage(
      id: json['id'],
      url: json['url'],
      type: json['type'],
      userId: json['userId'],
    );
  }

  Map<String, dynamic> toJson() {
    return {'id': id, 'url': url, 'type': type, 'userId': userId};
  }
}
