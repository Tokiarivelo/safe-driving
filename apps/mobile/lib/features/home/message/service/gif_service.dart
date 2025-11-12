import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:flutter/material.dart';
import 'package:cached_network_image/cached_network_image.dart';

class GifService {
  static const String apiKey = 'VBcJI5ksKrLNsOWdl32Mh7nGj2TW97mv';

  Future<List<Map<String, dynamic>>> fetchTrendingGifs() async {
    try {
      final response = await http.get(
        Uri.parse(
          'https://api.giphy.com/v1/gifs/trending?api_key=$apiKey&limit=15&rating=g',
        ),
      );

      print('📡 Statut API Giphy: ${response.statusCode}');

      if (response.statusCode == 200) {
        final data = json.decode(response.body);
        final gifs = data['data'] as List;

        List<Map<String, dynamic>> result = [];

        for (final gif in gifs) {
          try {
            final images = gif['images'];
            final original = images['original'];
            final fixedHeight = images['fixed_height'];

            final gifData = {
              'id': gif['id'],
              'url': original['url'],
              'preview_url': fixedHeight?['url'] ?? original['url'],
              'title': gif['title'] ?? 'GIF',
            };
            result.add(gifData);
          } catch (e) {
            print('⚠️ Erreur traitement GIF: $e');
          }
        }

        print('✅ ${result.length} GIFs chargés avec succès');
        return result;
      } else {
        print('❌ Erreur API: ${response.statusCode} - ${response.body}');
        return _getFallbackGifs();
      }
    } catch (e) {
      print('❌ Erreur réseau: $e');
      return _getFallbackGifs();
    }
  }

  List<Map<String, dynamic>> _getFallbackGifs() {
    return [
      {
        'id': 'fallback1',
        'url': 'https://media.giphy.com/media/26AHONQ79FdWZhAI0/giphy.gif',
        'preview_url':
            'https://media.giphy.com/media/26AHONQ79FdWZhAI0/giphy.gif',
        'title': 'Fallback GIF 1',
      },
      {
        'id': 'fallback2',
        'url': 'https://media.giphy.com/media/3o7aTskHEUdgCQAXde/giphy.gif',
        'preview_url':
            'https://media.giphy.com/media/3o7aTskHEUdgCQAXde/giphy.gif',
        'title': 'Fallback GIF 2',
      },
    ];
  }

  Widget buildGifPicker({
    required BuildContext context,
    required void Function(String) onGifSelected,
    required VoidCallback onClose,
  }) {
    return Container(
      height: MediaQuery.of(context).size.height * 0.4,
      color: Colors.white,
      child: Column(
        children: [
          Container(
            padding: EdgeInsets.all(16),
            decoration: BoxDecoration(
              border: Border(bottom: BorderSide(color: Colors.grey.shade300)),
            ),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  'Choisir un GIF',
                  style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                ),
                IconButton(icon: Icon(Icons.close), onPressed: onClose),
              ],
            ),
          ),
          Expanded(
            child: FutureBuilder<List<Map<String, dynamic>>>(
              future: fetchTrendingGifs(),
              builder: (context, snapshot) {
                if (snapshot.connectionState == ConnectionState.waiting) {
                  return Center(
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        CircularProgressIndicator(),
                        SizedBox(height: 16),
                        Text('Chargement des GIFs...'),
                      ],
                    ),
                  );
                }

                if (snapshot.hasError) {
                  print('❌ Erreur FutureBuilder: ${snapshot.error}');
                  return _buildGifErrorState(
                    onRetry: () {
                      // Force rebuild
                      (context as Element).markNeedsBuild();
                    },
                  );
                }

                final gifs = snapshot.data ?? [];

                if (gifs.isEmpty) {
                  return _buildGifErrorState(
                    onRetry: () {
                      (context as Element).markNeedsBuild();
                    },
                  );
                }

                return GridView.builder(
                  padding: EdgeInsets.all(8),
                  gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                    crossAxisCount: 2,
                    crossAxisSpacing: 8,
                    mainAxisSpacing: 8,
                    childAspectRatio: 1.2,
                  ),
                  itemCount: gifs.length,
                  itemBuilder: (context, index) {
                    final gif = gifs[index];
                    return GestureDetector(
                      onTap: () {
                        print('🎯 GIF sélectionné: ${gif['url']}');
                        onGifSelected(gif['url']);
                      },
                      child: Container(
                        decoration: BoxDecoration(
                          borderRadius: BorderRadius.circular(8),
                          border: Border.all(color: Colors.grey.shade300),
                          color: Colors.grey.shade100,
                        ),
                        child: ClipRRect(
                          borderRadius: BorderRadius.circular(8),
                          child: CachedNetworkImage(
                            imageUrl: gif['preview_url'] ?? gif['url'],
                            fit: BoxFit.cover,
                            width: double.infinity,
                            height: double.infinity,
                            placeholder: (context, url) => Center(
                              child: CircularProgressIndicator(strokeWidth: 2),
                            ),
                            errorWidget: (context, url, error) => Center(
                              child: Column(
                                mainAxisAlignment: MainAxisAlignment.center,
                                children: [
                                  Icon(
                                    Icons.error,
                                    color: Colors.grey,
                                    size: 30,
                                  ),
                                  SizedBox(height: 4),
                                  Text(
                                    'Erreur',
                                    style: TextStyle(fontSize: 10),
                                  ),
                                ],
                              ),
                            ),
                          ),
                        ),
                      ),
                    );
                  },
                );
              },
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildGifErrorState({required Function onRetry}) {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(Icons.wifi_off, size: 50, color: Colors.grey),
          SizedBox(height: 16),
          Text(
            'Impossible de charger les GIFs',
            style: TextStyle(fontSize: 16, color: Colors.grey),
          ),
          SizedBox(height: 8),
          Text(
            'Vérifiez votre connexion internet',
            style: TextStyle(fontSize: 12, color: Colors.grey),
          ),
          SizedBox(height: 16),
          ElevatedButton(onPressed: () => onRetry(), child: Text('Réessayer')),
        ],
      ),
    );
  }
}
