import 'package:flutter/material.dart';
import 'package:safe_driving/core/constants/colors/colors.dart';
import 'package:safe_driving/features/home/message/service/file_service.dart';

class FileMessageWidget extends StatelessWidget {
  final Map<String, String> fileData;
  final bool isMe;

  const FileMessageWidget({
    super.key,
    required this.fileData,
    required this.isMe,
  });

  @override
  Widget build(BuildContext context) {
    final fileService = FileService();

    return GestureDetector(
      onTap: () {
        fileService.downloadFile(fileData, context);
      },
      child: Container(
        padding: const EdgeInsets.all(12),
        decoration: BoxDecoration(
          color: isMe ? Colors.blue.shade50 : Colors.grey.shade100,
          borderRadius: BorderRadius.circular(12),
          border: Border.all(
            color: isMe ? Colors.blue.shade200 : Colors.grey.shade300,
          ),
        ),
        child: Row(
          children: [
            Container(
              padding: EdgeInsets.all(8),
              decoration: BoxDecoration(
                color: isMe ? AppColors.color1 : Colors.grey.shade300,
                borderRadius: BorderRadius.circular(8),
              ),
              child: Text(
                fileData['fileIcon']!,
                style: TextStyle(fontSize: 20),
              ),
            ),
            SizedBox(width: 12),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    fileData['fileName']!,
                    style: TextStyle(
                      fontSize: 14,
                      fontWeight: FontWeight.bold,
                      color: isMe ? Colors.blue.shade900 : Colors.grey.shade800,
                    ),
                    overflow: TextOverflow.ellipsis,
                  ),
                  SizedBox(height: 4),
                  Text(
                    fileData['fileSize']!,
                    style: TextStyle(
                      fontSize: 12,
                      color: isMe ? Colors.blue.shade700 : Colors.grey.shade600,
                    ),
                  ),
                ],
              ),
            ),
            SizedBox(width: 8),
            Icon(
              Icons.download_rounded,
              color: isMe ? AppColors.color1 : Colors.grey.shade600,
              size: 20,
            ),
          ],
        ),
      ),
    );
  }
}
