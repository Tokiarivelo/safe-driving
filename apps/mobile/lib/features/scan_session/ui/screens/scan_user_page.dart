import 'package:flutter/material.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import 'package:safe_driving/services/scan_session/scan_session_service.dart';

/// Page for scanning a target QR code (user/driver/ride) after receiving
/// a session ID from a deep link
class ScanUserPage extends StatefulWidget {
  final String sessionId;

  const ScanUserPage({super.key, required this.sessionId});

  @override
  State<ScanUserPage> createState() => _ScanUserPageState();
}

class _ScanUserPageState extends State<ScanUserPage> {
  bool _isLoading = false;
  String? _error;
  bool _scanComplete = false;

  // TODO: Remove this demo method in production when using actual QR scanner
  String _generateDemoScanValue() {
    return 'demo_scanned_value_${DateTime.now().millisecondsSinceEpoch}';
  }

  // Note: In production, integrate with mobile_scanner or qr_code_scanner package
  // For now, this provides the UI structure and simulated scanning
  Future<void> _handleScanResult(String scannedValue) async {
    if (_isLoading) return;

    setState(() {
      _isLoading = true;
      _error = null;
    });

    try {
      final client = GraphQLProvider.of(context).value;
      final service = ScanSessionService(client);

      final success = await service.sendScanResult(
        sessionId: widget.sessionId,
        scannedValue: scannedValue,
      );

      if (mounted) {
        if (success) {
          setState(() {
            _scanComplete = true;
            _isLoading = false;
          });
          // Navigate to success screen after a short delay
          Future.delayed(const Duration(seconds: 2), () {
            if (mounted) {
              Navigator.of(context).pop(true);
            }
          });
        } else {
          setState(() {
            _error = 'Session expired or invalid. Please try again.';
            _isLoading = false;
          });
        }
      }
    } catch (e) {
      if (mounted) {
        setState(() {
          _error = 'Failed to send scan result: $e';
          _isLoading = false;
        });
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Scan QR Code'),
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          onPressed: () => Navigator.of(context).pop(false),
        ),
      ),
      body: _buildBody(),
    );
  }

  Widget _buildBody() {
    if (_scanComplete) {
      return _buildSuccessView();
    }

    if (_error != null) {
      return _buildErrorView();
    }

    return _buildScanView();
  }

  Widget _buildScanView() {
    return Stack(
      children: [
        // Placeholder for camera view
        // In production, replace with MobileScanner or similar widget
        Container(
          color: Colors.black,
          child: const Center(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Icon(
                  Icons.qr_code_scanner,
                  size: 100,
                  color: Colors.white54,
                ),
                SizedBox(height: 20),
                Text(
                  'Point camera at QR code',
                  style: TextStyle(
                    color: Colors.white,
                    fontSize: 18,
                  ),
                ),
                SizedBox(height: 10),
                Text(
                  'Session ID active',
                  style: TextStyle(
                    color: Colors.white70,
                    fontSize: 14,
                  ),
                ),
              ],
            ),
          ),
        ),
        // Scan overlay
        Center(
          child: Container(
            width: 250,
            height: 250,
            decoration: BoxDecoration(
              border: Border.all(
                color: Colors.white,
                width: 2,
              ),
              borderRadius: BorderRadius.circular(12),
            ),
          ),
        ),
        // Loading indicator
        if (_isLoading)
          Container(
            color: Colors.black54,
            child: const Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  CircularProgressIndicator(color: Colors.white),
                  SizedBox(height: 20),
                  Text(
                    'Processing...',
                    style: TextStyle(color: Colors.white),
                  ),
                ],
              ),
            ),
          ),
        // Demo scan button (remove in production when using actual scanner)
        Positioned(
          bottom: 50,
          left: 0,
          right: 0,
          child: Center(
            child: ElevatedButton.icon(
              onPressed: _isLoading
                  ? null
                  : () => _handleScanResult(_generateDemoScanValue()),
              icon: const Icon(Icons.qr_code),
              label: const Text('Simulate Scan'),
              style: ElevatedButton.styleFrom(
                padding: const EdgeInsets.symmetric(
                  horizontal: 24,
                  vertical: 12,
                ),
              ),
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildSuccessView() {
    return Container(
      color: Colors.green,
      child: const Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(
              Icons.check_circle,
              size: 100,
              color: Colors.white,
            ),
            SizedBox(height: 20),
            Text(
              'Scan Successful!',
              style: TextStyle(
                color: Colors.white,
                fontSize: 24,
                fontWeight: FontWeight.bold,
              ),
            ),
            SizedBox(height: 10),
            Text(
              'Returning...',
              style: TextStyle(
                color: Colors.white70,
                fontSize: 16,
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildErrorView() {
    return Container(
      padding: const EdgeInsets.all(24),
      child: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Icon(
              Icons.error_outline,
              size: 80,
              color: Colors.red,
            ),
            const SizedBox(height: 20),
            Text(
              _error ?? 'An error occurred',
              textAlign: TextAlign.center,
              style: const TextStyle(
                fontSize: 16,
              ),
            ),
            const SizedBox(height: 24),
            ElevatedButton(
              onPressed: () {
                setState(() {
                  _error = null;
                });
              },
              child: const Text('Try Again'),
            ),
            const SizedBox(height: 12),
            TextButton(
              onPressed: () => Navigator.of(context).pop(false),
              child: const Text('Cancel'),
            ),
          ],
        ),
      ),
    );
  }
}
