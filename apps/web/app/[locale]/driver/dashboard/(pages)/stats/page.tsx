'use client';

import React, { useMemo } from 'react';
import { useGetDriverStatisticsQuery, useGetTopDriversQuery } from '@/graphql/generated/graphql';
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
} from 'recharts';

export default function DriverStatsPage() {
  const { data, loading, error } = useGetDriverStatisticsQuery({
    fetchPolicy: 'cache-and-network',
  });

  const { data: topDriversData, loading: topDriversLoading } = useGetTopDriversQuery({
    variables: { limit: 10 },
    fetchPolicy: 'cache-and-network',
  });

  // Mock data for charts - in production, this would come from actual historical data
  const revenueData = useMemo(() => {
    if (!data?.getDriverStatistics.statistics) return [];
    const stats = data.getDriverStatistics.statistics;
    const avgMonthlyRevenue = stats.revenue / 12;
    
    return [
      { month: 'Jan', revenue: avgMonthlyRevenue * 0.7 },
      { month: 'Fév', revenue: avgMonthlyRevenue * 0.8 },
      { month: 'Mar', revenue: avgMonthlyRevenue * 0.9 },
      { month: 'Avr', revenue: avgMonthlyRevenue * 1.1 },
      { month: 'Mai', revenue: avgMonthlyRevenue * 1.2 },
      { month: 'Juin', revenue: avgMonthlyRevenue * 1.0 },
      { month: 'Juil', revenue: avgMonthlyRevenue * 0.95 },
    ];
  }, [data]);

  const ridesData = useMemo(() => {
    if (!data?.getDriverStatistics.statistics) return [];
    const stats = data.getDriverStatistics.statistics;
    const avgMonthlyRides = stats.completedRides / 12;
    
    return [
      { month: 'Jan', rides: Math.floor(avgMonthlyRides * 0.7), lastMonth: Math.floor(avgMonthlyRides * 0.6) },
      { month: 'Fév', rides: Math.floor(avgMonthlyRides * 0.8), lastMonth: Math.floor(avgMonthlyRides * 0.7) },
      { month: 'Mar', rides: Math.floor(avgMonthlyRides * 0.9), lastMonth: Math.floor(avgMonthlyRides * 0.8) },
      { month: 'Avr', rides: Math.floor(avgMonthlyRides * 1.1), lastMonth: Math.floor(avgMonthlyRides * 0.9) },
      { month: 'Mai', rides: Math.floor(avgMonthlyRides * 1.2), lastMonth: Math.floor(avgMonthlyRides * 1.0) },
      { month: 'Juin', rides: Math.floor(avgMonthlyRides * 1.0), lastMonth: Math.floor(avgMonthlyRides * 1.1) },
      { month: 'Juil', rides: Math.floor(avgMonthlyRides * 0.95), lastMonth: Math.floor(avgMonthlyRides * 1.2) },
    ];
  }, [data]);

  const distributionData = useMemo(() => {
    if (!data?.getDriverStatistics.statistics) return [];
    const stats = data.getDriverStatistics.statistics;
    
    return [
      { name: 'Courses courtes', value: Math.floor(stats.completedRides * 0.4), color: '#3b82f6' },
      { name: 'Courses moyennes', value: Math.floor(stats.completedRides * 0.35), color: '#f59e0b' },
      { name: 'Courses longues', value: Math.floor(stats.completedRides * 0.25), color: '#8b5cf6' },
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

  if (error || !data?.getDriverStatistics.success) {
    return (
      <div className="p-6">
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-6">
            <p className="text-red-600">
              {data?.getDriverStatistics.message || 'Erreur lors du chargement des statistiques'}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const stats = data.getDriverStatistics.statistics;

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
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Total Rides */}
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-blue-900">
              Courses terminées
            </CardTitle>
            <Icon icon="mdi:car" className="h-6 w-6 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-900">{stats.completedRides}</div>
            <p className="text-xs text-blue-700 mt-1">Total des courses</p>
          </CardContent>
        </Card>

        {/* Total Revenue */}
        <Card className="border-green-200 bg-green-50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-green-900">
              Revenus totaux
            </CardTitle>
            <Icon icon="mdi:cash-multiple" className="h-6 w-6 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-900">
              {stats.revenue.toLocaleString('fr-FR')} MGA
            </div>
            <p className="text-xs text-green-700 mt-1">Depuis le début</p>
          </CardContent>
        </Card>

        {/* Average Rating */}
        <Card className="border-yellow-200 bg-yellow-50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-yellow-900">
              Note moyenne
            </CardTitle>
            <Icon icon="mdi:star" className="h-6 w-6 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-900 flex items-center gap-1">
              {stats.averageRating.toFixed(1)}
              <Icon icon="mdi:star" className="h-6 w-6 text-yellow-500" />
            </div>
            <p className="text-xs text-yellow-700 mt-1">
              {stats.totalReviews} avis reçus
            </p>
          </CardContent>
        </Card>

        {/* Motivation Score */}
        <Card className="border-purple-200 bg-purple-50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-purple-900">
              Score de motivation
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
        {/* Revenue Trend Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Revenus mensuels</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
                <YAxis stroke="#6b7280" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                  }}
                  formatter={(value: number) => `${value.toLocaleString('fr-FR')} MGA`}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  dot={{ fill: '#3b82f6', r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Rides Comparison Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Courses par mois</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={ridesData}>
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
                <Legend />
                <Bar dataKey="rides" fill="#3b82f6" name="Ce mois" radius={[8, 8, 0, 0]} />
                <Bar dataKey="lastMonth" fill="#f59e0b" name="Mois dernier" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Distribution Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Distribution des courses</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={distributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {distributionData.map((entry, index) => (
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

        {/* Performance Metrics */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Métriques de performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Icon icon="mdi:calendar-month" className="h-8 w-8 text-blue-500" />
                  <div>
                    <p className="font-semibold">Courses par mois</p>
                    <p className="text-sm text-gray-600">Moyenne mensuelle</p>
                  </div>
                </div>
                <p className="text-2xl font-bold text-blue-600">
                  {Math.round(stats.completedRides / 12)}
                </p>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Icon icon="mdi:cash" className="h-8 w-8 text-green-500" />
                  <div>
                    <p className="font-semibold">Revenu par course</p>
                    <p className="text-sm text-gray-600">Moyenne</p>
                  </div>
                </div>
                <p className="text-2xl font-bold text-green-600">
                  {stats.completedRides > 0 
                    ? Math.round(stats.revenue / stats.completedRides).toLocaleString('fr-FR')
                    : 0} MGA
                </p>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Icon icon="mdi:star-rate" className="h-8 w-8 text-yellow-500" />
                  <div>
                    <p className="font-semibold">Taux de satisfaction</p>
                    <p className="text-sm text-gray-600">Basé sur les avis</p>
                  </div>
                </div>
                <p className="text-2xl font-bold text-yellow-600">
                  {((stats.averageRating / 5) * 100).toFixed(0)}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Drivers Leaderboard */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <Icon icon="mdi:trophy" className="h-6 w-6 text-yellow-500" />
            Classement des meilleurs chauffeurs
          </CardTitle>
        </CardHeader>
        <CardContent>
          {topDriversLoading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-16" />
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {topDriversData?.getTopDrivers.drivers.map((driver, index) => (
                <div
                  key={driver.driverId}
                  className={`flex items-center gap-4 p-4 rounded-lg transition-colors ${
                    driver.driverId === stats.driverId
                      ? 'bg-blue-50 border-2 border-blue-300'
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold">
                    {driver.firstName?.[0] || ''}
                    {driver.lastName?.[0] || ''}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold">
                      {driver.firstName} {driver.lastName}
                    </h4>
                    <div className="flex gap-4 text-sm text-gray-600">
                      <span>{driver.completedRides} courses</span>
                      <span className="flex items-center gap-1">
                        {driver.averageRating.toFixed(1)}
                        <Icon icon="mdi:star" className="h-4 w-4 text-yellow-500" />
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600">
                      {driver.revenue.toLocaleString('fr-FR')} MGA
                    </p>
                    <p className="text-xs text-gray-500">Score: {driver.motivationScore}%</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
