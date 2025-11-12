import 'package:flutter/material.dart';
import 'package:cached_network_image/cached_network_image.dart';
import 'package:safe_driving/core/constants/colors/colors.dart';

class GifMessageWidget extends StatefulWidget {
  final String gifUrl;
  final bool isMe;

  const GifMessageWidget({super.key, required this.gifUrl, required this.isMe});

  @override
  State<GifMessageWidget> createState() => _GifMessageWidgetState();
}

class _GifMessageWidgetState extends State<GifMessageWidget> {
  String? _cleanUrl;

  @override
  void initState() {
    super.initState();
    _cleanUrl = _extractGifUrlRobuste(widget.gifUrl);
  }

  String? _extractGifUrlRobuste(String content) {
    try {
      final regex = RegExp(r'https?://[^\s)+]+');
      final match = regex.firstMatch(content);
      if (match != null) {
        String url = match.group(0)!;
        url = url.replaceAll('(', '').replaceAll(')', '').trim();
        return url;
      }

      if (content.startsWith('![GIF](')) {
        final startIndex = content.indexOf('http');
        if (startIndex != -1) {
          String url = content.substring(startIndex);
          if (url.endsWith(')')) {
            url = url.substring(0, url.length - 1);
          }
          url = url.replaceAll('(', '').trim();
          return url;
        }
      }

      if (content.startsWith('http')) {
        return content.replaceAll('(', '').replaceAll(')', '').trim();
      }

      return null;
    } catch (e) {
      print('❌ Erreur extraction robuste URL GIF: $e');
      return null;
    }
  }

  @override
  Widget build(BuildContext context) {
    String? displayUrl = _cleanUrl;

    if (displayUrl == null) {
      displayUrl = widget.gifUrl.replaceAll('(', '').replaceAll(')', '').trim();
      if (!displayUrl.startsWith('http')) {
        final httpIndex = displayUrl.indexOf('http');
        if (httpIndex != -1) {
          displayUrl = displayUrl.substring(httpIndex);
        } else {
          return _buildGifErrorWidget('URL invalide');
        }
      }
    }

    return Container(
      margin: const EdgeInsets.only(bottom: 4),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(12),
        border: Border.all(
          color: widget.isMe
              ? Colors.white.withOpacity(0.3)
              : Colors.grey.shade300,
          width: 1,
        ),
      ),
      child: ClipRRect(
        borderRadius: BorderRadius.circular(12),
        child: CachedNetworkImage(
          imageUrl: displayUrl,
          width: 200,
          height: 150,
          fit: BoxFit.cover,
          fadeInDuration: const Duration(milliseconds: 300),
          placeholder: (context, url) => Container(
            width: 200,
            height: 150,
            color: Colors.grey.shade200,
            child: Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  CircularProgressIndicator(
                    valueColor: AlwaysStoppedAnimation<Color>(
                      widget.isMe ? Colors.white : AppColors.color1,
                    ),
                  ),
                  SizedBox(height: 8),
                  Text(
                    'Chargement...',
                    style: TextStyle(
                      fontSize: 10,
                      color: widget.isMe
                          ? Colors.white70
                          : Colors.grey.shade600,
                    ),
                  ),
                ],
              ),
            ),
          ),
          errorWidget: (context, url, error) {
            print('❌ Erreur chargement GIF: $error');
            print('📦 URL essayée: $url');
            return _buildGifErrorWidget('Erreur de chargement');
          },
        ),
      ),
    );
  }

  Widget _buildGifErrorWidget(String message) {
    return GestureDetector(
      onTap: () {
        setState(() {});
      },
      child: Container(
        width: 200,
        height: 150,
        color: Colors.grey.shade300,
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(Icons.error_outline, color: Colors.grey.shade500, size: 40),
            SizedBox(height: 8),
            Text(
              message,
              style: TextStyle(fontSize: 12, color: Colors.grey.shade600),
            ),
            SizedBox(height: 4),
            Text(
              'Tap pour réessayer',
              style: TextStyle(fontSize: 10, color: Colors.grey.shade500),
            ),
          ],
        ),
      ),
    );
  }
}
