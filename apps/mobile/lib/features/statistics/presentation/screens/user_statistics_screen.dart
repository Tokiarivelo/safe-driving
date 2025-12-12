import 'package:flutter/material.dart';
import 'package:percent_indicator/percent_indicator.dart';

class UserStatisticsScreen extends StatefulWidget {
  const UserStatisticsScreen({Key? key}) : super(key: key);

  @override
  State<UserStatisticsScreen> createState() => _UserStatisticsScreenState();
}

class _UserStatisticsScreenState extends State<UserStatisticsScreen> {
  // Mock data - in production, this would come from GraphQL
  final Map<String, dynamic> _statistics = {
    'completedRides': 28,
    'averageRating': 4.5,
    'totalReviews': 24,
    'motivationScore': 72,
  };

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Mes Statistiques'),
        backgroundColor: Colors.blue[700],
        elevation: 0,
      ),
      body: RefreshIndicator(
        onRefresh: () async {
          // TODO: Implement refresh from GraphQL
          await Future.delayed(const Duration(seconds: 1));
        },
        child: SingleChildScrollView(
          physics: const AlwaysScrollableScrollPhysics(),
          child: Padding(
            padding: const EdgeInsets.all(16.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // Statistics Cards Grid
                GridView.count(
                  shrinkWrap: true,
                  physics: const NeverScrollableScrollPhysics(),
                  crossAxisCount: 2,
                  crossAxisSpacing: 16,
                  mainAxisSpacing: 16,
                  childAspectRatio: 1.2,
                  children: [
                    _buildStatCard(
                      title: 'Courses',
                      value: _statistics['completedRides'].toString(),
                      icon: Icons.directions_car,
                      color: Colors.blue,
                    ),
                    _buildStatCard(
                      title: 'Note moyenne',
                      value: _statistics['averageRating'].toStringAsFixed(1),
                      icon: Icons.star,
                      color: Colors.amber,
                      suffix: '⭐',
                    ),
                    _buildStatCard(
                      title: 'Avis donnés',
                      value: _statistics['totalReviews'].toString(),
                      icon: Icons.rate_review,
                      color: Colors.purple,
                    ),
                    _buildStatCard(
                      title: 'Score',
                      value: '${_statistics['motivationScore']}%',
                      icon: Icons.trending_up,
                      color: Colors.green,
                    ),
                  ],
                ),
                const SizedBox(height: 24),

                // Activity Score
                Card(
                  elevation: 4,
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: Padding(
                    padding: const EdgeInsets.all(20.0),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          children: [
                            Icon(Icons.local_fire_department, color: Colors.orange[700]),
                            const SizedBox(width: 8),
                            Text(
                              'Score d\'Activité',
                              style: TextStyle(
                                fontSize: 18,
                                fontWeight: FontWeight.bold,
                                color: Colors.grey[800],
                              ),
                            ),
                          ],
                        ),
                        const SizedBox(height: 20),
                        Center(
                          child: CircularPercentIndicator(
                            radius: 80.0,
                            lineWidth: 12.0,
                            percent: _statistics['motivationScore'] / 100,
                            center: Text(
                              '${_statistics['motivationScore']}%',
                              style: const TextStyle(
                                fontSize: 32,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                            progressColor: _getScoreColor(
                              _statistics['motivationScore'],
                            ),
                            backgroundColor: Colors.grey[200]!,
                            circularStrokeCap: CircularStrokeCap.round,
                          ),
                        ),
                        const SizedBox(height: 16),
                        Center(
                          child: Text(
                            _getScoreLabel(_statistics['motivationScore']),
                            style: TextStyle(
                              fontSize: 16,
                              color: Colors.grey[600],
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
                const SizedBox(height: 24),

                // Activity History
                Card(
                  elevation: 4,
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: Padding(
                    padding: const EdgeInsets.all(20.0),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          'Historique d\'Activité',
                          style: TextStyle(
                            fontSize: 18,
                            fontWeight: FontWeight.bold,
                            color: Colors.grey[800],
                          ),
                        ),
                        const SizedBox(height: 20),
                        _buildActivityItem(
                          'Trajets terminés',
                          _statistics['completedRides'].toString(),
                          Icons.check_circle,
                          Colors.green,
                        ),
                        const SizedBox(height: 16),
                        _buildActivityItem(
                          'Avis donnés',
                          _statistics['totalReviews'].toString(),
                          Icons.comment,
                          Colors.blue,
                        ),
                        const SizedBox(height: 16),
                        _buildActivityItem(
                          'Note moyenne donnée',
                          _statistics['averageRating'].toStringAsFixed(1),
                          Icons.star_rate,
                          Colors.amber,
                        ),
                      ],
                    ),
                  ),
                ),
                const SizedBox(height: 24),

                // Engagement Metrics
                Card(
                  elevation: 4,
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: Padding(
                    padding: const EdgeInsets.all(20.0),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          'Métriques d\'Engagement',
                          style: TextStyle(
                            fontSize: 18,
                            fontWeight: FontWeight.bold,
                            color: Colors.grey[800],
                          ),
                        ),
                        const SizedBox(height: 20),
                        LinearPercentIndicator(
                          lineHeight: 20.0,
                          percent: (_statistics['completedRides'] / 50).clamp(0.0, 1.0),
                          center: Text(
                            'Courses: ${_statistics['completedRides']}/50',
                            style: const TextStyle(fontSize: 12, color: Colors.white),
                          ),
                          backgroundColor: Colors.grey[300]!,
                          progressColor: Colors.blue,
                          barRadius: const Radius.circular(10),
                        ),
                        const SizedBox(height: 16),
                        LinearPercentIndicator(
                          lineHeight: 20.0,
                          percent: (_statistics['totalReviews'] / 40).clamp(0.0, 1.0),
                          center: Text(
                            'Avis: ${_statistics['totalReviews']}/40',
                            style: const TextStyle(fontSize: 12, color: Colors.white),
                          ),
                          backgroundColor: Colors.grey[300]!,
                          progressColor: Colors.purple,
                          barRadius: const Radius.circular(10),
                        ),
                        const SizedBox(height: 16),
                        LinearPercentIndicator(
                          lineHeight: 20.0,
                          percent: _statistics['motivationScore'] / 100,
                          center: Text(
                            'Score: ${_statistics['motivationScore']}%',
                            style: const TextStyle(fontSize: 12, color: Colors.white),
                          ),
                          backgroundColor: Colors.grey[300]!,
                          progressColor: Colors.green,
                          barRadius: const Radius.circular(10),
                        ),
                      ],
                    ),
                  ),
                ),
                const SizedBox(height: 24),

                // Tips Card
                Card(
                  color: Colors.green[50],
                  elevation: 2,
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: Padding(
                    padding: const EdgeInsets.all(16.0),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          children: [
                            Icon(Icons.lightbulb_outline, color: Colors.green[700]),
                            const SizedBox(width: 8),
                            Text(
                              'Conseils pour améliorer votre score',
                              style: TextStyle(
                                fontSize: 16,
                                fontWeight: FontWeight.bold,
                                color: Colors.green[900],
                              ),
                            ),
                          ],
                        ),
                        const SizedBox(height: 12),
                        _buildTipItem('Effectuez plus de trajets régulièrement'),
                        _buildTipItem('Laissez des avis après chaque course'),
                        _buildTipItem('Soyez ponctuel et respectueux'),
                      ],
                    ),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildStatCard({
    required String title,
    required String value,
    required IconData icon,
    required Color color,
    String suffix = '',
  }) {
    return Card(
      elevation: 4,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(12),
      ),
      child: Container(
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(12),
          gradient: LinearGradient(
            colors: [color.withOpacity(0.1), color.withOpacity(0.05)],
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
          ),
        ),
        padding: const EdgeInsets.all(16),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(icon, color: color, size: 36),
            const SizedBox(height: 12),
            Text(
              value + suffix,
              style: TextStyle(
                fontSize: 24,
                fontWeight: FontWeight.bold,
                color: color,
              ),
            ),
            const SizedBox(height: 4),
            Text(
              title,
              style: TextStyle(
                fontSize: 14,
                color: Colors.grey[600],
              ),
              textAlign: TextAlign.center,
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildActivityItem(
    String label,
    String value,
    IconData icon,
    Color color,
  ) {
    return Row(
      children: [
        Container(
          padding: const EdgeInsets.all(8),
          decoration: BoxDecoration(
            color: color.withOpacity(0.1),
            borderRadius: BorderRadius.circular(8),
          ),
          child: Icon(icon, color: color, size: 24),
        ),
        const SizedBox(width: 16),
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                label,
                style: TextStyle(
                  fontSize: 14,
                  color: Colors.grey[600],
                ),
              ),
              const SizedBox(height: 4),
              Text(
                value,
                style: const TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildTipItem(String text) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 4),
      child: Row(
        children: [
          Icon(Icons.check_circle_outline, color: Colors.green[700], size: 18),
          const SizedBox(width: 8),
          Expanded(
            child: Text(
              text,
              style: TextStyle(
                fontSize: 14,
                color: Colors.green[900],
              ),
            ),
          ),
        ],
      ),
    );
  }

  Color _getScoreColor(int score) {
    if (score >= 80) return Colors.green;
    if (score >= 60) return Colors.blue;
    if (score >= 40) return Colors.orange;
    return Colors.red;
  }

  String _getScoreLabel(int score) {
    if (score >= 80) return 'Excellent!';
    if (score >= 60) return 'Bon travail!';
    if (score >= 40) return 'Peut mieux faire';
    return 'À améliorer';
  }
}
