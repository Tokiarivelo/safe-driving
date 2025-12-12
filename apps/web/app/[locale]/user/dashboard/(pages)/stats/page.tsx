'use client';

import React, { useMemo } from 'react';
import { useGetUserStatisticsQuery } from '@/graphql/generated/graphql';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { Icon } from '@iconify/react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from 'recharts';

export default function UserStatsPage() {
  const { data, loading, error } = useGetUserStatisticsQuery({
    fetchPolicy: 'cache-and-network',
  });

  // Mock data for activity trend
  const activityData = useMemo(() => {
    if (!data?.getUserStatistics.statistics) return [];
    const stats = data.getUserStatistics.statistics;
    const avgMonthlyRides = stats.completedRides / 12;
    
    return [
      { month: 'Jan', rides: Math.floor(avgMonthlyRides * 0.6) },
      { month: 'Fév', rides: Math.floor(avgMonthlyRides * 0.7) },
      { month: 'Mar', rides: Math.floor(avgMonthlyRides * 0.9) },
      { month: 'Avr', rides: Math.floor(avgMonthlyRides * 1.1) },
      { month: 'Mai', rides: Math.floor(avgMonthlyRides * 1.3) },
      { month: 'Juin', rides: Math.floor(avgMonthlyRides * 1.2) },
      { month: 'Juil', rides: Math.floor(avgMonthlyRides * 1.0) },
    ];
  }, [data]);

  // Mock data for ratings distribution
  const ratingsData = useMemo(() => {
    if (!data?.getUserStatistics.statistics) return [];
    const stats = data.getUserStatistics.statistics;
    
    return [
      { name: '5 étoiles', value: Math.floor(stats.totalReviews * 0.5), color: '#10b981' },
      { name: '4 étoiles', value: Math.floor(stats.totalReviews * 0.3), color: '#3b82f6' },
      { name: '3 étoiles', value: Math.floor(stats.totalReviews * 0.2), color: '#f59e0b' },
    ];
  }, [data]);

  // Mock data for engagement radar
  const engagementData = useMemo(() => {
    if (!data?.getUserStatistics.statistics) return [];
    const stats = data.getUserStatistics.statistics;
    
    return [
      { category: 'Activité', value: Math.min(100, (stats.completedRides / 40) * 100) },
      { category: 'Avis', value: Math.min(100, (stats.totalReviews / 40) * 100) },
      { category: 'Note', value: (stats.averageRating / 5) * 100 },
      { category: 'Régularité', value: stats.motivationScore },
    ];
  }, [data]);

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <Skeleton className="h-12 w-48" />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
      </div>
    );
  }

  if (error || !data?.getUserStatistics.success) {
    return (
      <div className="p-6">
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-6">
            <p className="text-red-600">
              {data?.getUserStatistics.message || 'Erreur lors du chargement des statistiques'}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const stats = data.getUserStatistics.statistics;

  if (!stats) {
    return (
      <div className="p-6">
        <Card>
          <CardContent className="p-6">
            <p className="text-gray-600">Aucune statistique disponible</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Mes Statistiques</h1>
        <div className="text-sm text-gray-500">
          Dernière mise à jour: {new Date(stats.updatedAt).toLocaleDateString('fr-FR')}
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Total Rides */}
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-blue-900">
              Courses effectuées
            </CardTitle>
            <Icon icon="mdi:car" className="h-6 w-6 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-900">{stats.completedRides}</div>
            <p className="text-xs text-blue-700 mt-1">Total des trajets</p>
          </CardContent>
        </Card>

        {/* Average Rating */}
        <Card className="border-yellow-200 bg-yellow-50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-yellow-900">
              Note moyenne donnée
            </CardTitle>
            <Icon icon="mdi:star" className="h-6 w-6 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-900 flex items-center gap-1">
              {stats.averageRating.toFixed(1)}
              <Icon icon="mdi:star" className="h-6 w-6 text-yellow-500" />
            </div>
            <p className="text-xs text-yellow-700 mt-1">
              {stats.totalReviews} avis donnés
            </p>
          </CardContent>
        </Card>

        {/* Motivation Score */}
        <Card className="border-purple-200 bg-purple-50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-purple-900">
              Score d'activité
            </CardTitle>
            <Icon icon="mdi:lightning-bolt" className="h-6 w-6 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-900">{stats.motivationScore}%</div>
            <Progress value={stats.motivationScore} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Activity Trend */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Activité mensuelle</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={activityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
                <YAxis stroke="#6b7280" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="rides"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  dot={{ fill: '#3b82f6', r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Ratings Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Distribution des notes</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={ratingsData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {ratingsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                  }}
                />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Engagement Radar */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Profil d'engagement</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={engagementData}>
                <PolarGrid stroke="#e5e7eb" />
                <PolarAngleAxis dataKey="category" fontSize={12} />
                <PolarRadiusAxis angle={90} domain={[0, 100]} fontSize={10} />
                <Radar
                  name="Engagement"
                  dataKey="value"
                  stroke="#3b82f6"
                  fill="#3b82f6"
                  fillOpacity={0.5}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                  }}
                  formatter={(value: number) => `${value.toFixed(0)}%`}
                />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Activity Metrics */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Métriques d'activité</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Icon icon="mdi:calendar-month" className="h-8 w-8 text-blue-500" />
                  <div>
                    <p className="font-semibold">Courses par mois</p>
                    <p className="text-sm text-gray-600">Moyenne</p>
                  </div>
                </div>
                <p className="text-2xl font-bold text-blue-600">
                  {Math.round(stats.completedRides / Math.max(1, 
                    Math.ceil((new Date().getTime() - new Date(stats.createdAt).getTime()) / (1000 * 60 * 60 * 24 * 30))
                  ))}
                </p>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Icon icon="mdi:comment-text" className="h-8 w-8 text-yellow-500" />
                  <div>
                    <p className="font-semibold">Taux d'évaluation</p>
                    <p className="text-sm text-gray-600">Avis donnés</p>
                  </div>
                </div>
                <p className="text-2xl font-bold text-yellow-600">
                  {stats.completedRides > 0 
                    ? Math.round((stats.totalReviews / stats.completedRides) * 100)
                    : 0}%
                </p>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Icon icon="mdi:trophy" className="h-8 w-8 text-purple-500" />
                  <div>
                    <p className="font-semibold">Niveau</p>
                    <p className="text-sm text-gray-600">
                      {stats.motivationScore >= 80 ? 'Expert' : 
                       stats.motivationScore >= 60 ? 'Avancé' : 
                       stats.motivationScore >= 40 ? 'Intermédiaire' : 'Débutant'}
                    </p>
                  </div>
                </div>
                <p className="text-2xl font-bold text-purple-600">
                  {stats.motivationScore}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progress Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Progression vers les objectifs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="font-medium">Courses complétées</span>
                <span className="text-sm text-gray-600">{stats.completedRides} / 50</span>
              </div>
              <Progress value={(stats.completedRides / 50) * 100} className="h-3" />
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="font-medium">Avis donnés</span>
                <span className="text-sm text-gray-600">{stats.totalReviews} / 40</span>
              </div>
              <Progress value={(stats.totalReviews / 40) * 100} className="h-3" />
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="font-medium">Score d'activité</span>
                <span className="text-sm text-gray-600">{stats.motivationScore}%</span>
              </div>
              <Progress value={stats.motivationScore} className="h-3" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tips Card */}
      <Card className="border-green-200 bg-green-50">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2 text-green-900">
            <Icon icon="mdi:lightbulb" className="h-6 w-6 text-green-600" />
            Conseils pour améliorer votre score
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-green-900">
            <li className="flex items-start gap-2">
              <Icon icon="mdi:check-circle" className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
              <span>Effectuez plus de trajets régulièrement pour augmenter votre activité</span>
            </li>
            <li className="flex items-start gap-2">
              <Icon icon="mdi:check-circle" className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
              <span>Laissez des avis constructifs après chaque course</span>
            </li>
            <li className="flex items-start gap-2">
              <Icon icon="mdi:check-circle" className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
              <span>Soyez ponctuel et respectueux avec les chauffeurs</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
