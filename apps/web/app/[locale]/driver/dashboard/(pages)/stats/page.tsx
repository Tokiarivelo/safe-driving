'use client';

import React from 'react';
import { useGetDriverStatisticsQuery, useGetTopDriversQuery } from '@/graphql/generated/graphql';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { Icon } from '@iconify/react';

export default function DriverStatsPage() {
  const { data, loading, error } = useGetDriverStatisticsQuery({
    fetchPolicy: 'cache-and-network',
  });

  const { data: topDriversData, loading: topDriversLoading } = useGetTopDriversQuery({
    variables: { limit: 10 },
    fetchPolicy: 'cache-and-network',
  });

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

      {/* Driver Details Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Détails du chauffeur</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-xl font-bold">
                {stats.driver?.firstName?.[0]}
                {stats.driver?.lastName?.[0]}
              </div>
              <div>
                <h3 className="font-semibold text-lg">
                  {stats.driver?.firstName} {stats.driver?.lastName}
                </h3>
                <p className="text-sm text-gray-600">{stats.driver?.email}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t">
              <div>
                <p className="text-sm text-gray-600">Courses par mois (moyenne)</p>
                <p className="text-xl font-semibold">
                  {Math.round(stats.completedRides / Math.max(1, 
                    Math.ceil((new Date().getTime() - new Date(stats.createdAt).getTime()) / (1000 * 60 * 60 * 24 * 30))
                  ))}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Revenu moyen par course</p>
                <p className="text-xl font-semibold">
                  {stats.completedRides > 0 
                    ? Math.round(stats.revenue / stats.completedRides).toLocaleString('fr-FR')
                    : 0} MGA
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

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
                    {driver.firstName[0]}
                    {driver.lastName?.[0]}
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
