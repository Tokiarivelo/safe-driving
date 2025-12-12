'use client';

import React from 'react';
import { useGetUserStatisticsQuery } from '@/graphql/generated/graphql';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { Icon } from '@iconify/react';

export default function UserStatsPage() {
  const { data, loading, error } = useGetUserStatisticsQuery({
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

      {/* User Details Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Profil utilisateur</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-xl font-bold">
                {stats.user?.firstName?.[0]}
                {stats.user?.lastName?.[0]}
              </div>
              <div>
                <h3 className="font-semibold text-lg">
                  {stats.user?.firstName} {stats.user?.lastName}
                </h3>
                <p className="text-sm text-gray-600">{stats.user?.email}</p>
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
                <p className="text-sm text-gray-600">Membre depuis</p>
                <p className="text-xl font-semibold">
                  {new Date(stats.createdAt).toLocaleDateString('fr-FR', {
                    year: 'numeric',
                    month: 'long'
                  })}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Activity Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <Icon icon="mdi:chart-line" className="h-6 w-6 text-blue-500" />
            Aperçu de l'activité
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Icon icon="mdi:map-marker-distance" className="h-8 w-8 text-blue-500" />
                <div>
                  <p className="font-semibold">Trajets terminés</p>
                  <p className="text-sm text-gray-600">Courses que vous avez effectuées</p>
                </div>
              </div>
              <p className="text-2xl font-bold text-blue-600">{stats.completedRides}</p>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Icon icon="mdi:comment-text" className="h-8 w-8 text-yellow-500" />
                <div>
                  <p className="font-semibold">Avis donnés</p>
                  <p className="text-sm text-gray-600">Évaluations des chauffeurs</p>
                </div>
              </div>
              <p className="text-2xl font-bold text-yellow-600">{stats.totalReviews}</p>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Icon icon="mdi:lightning-bolt-circle" className="h-8 w-8 text-purple-500" />
                <div>
                  <p className="font-semibold">Niveau d'engagement</p>
                  <p className="text-sm text-gray-600">Basé sur votre activité</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-purple-600">{stats.motivationScore}%</p>
                <p className="text-xs text-gray-500">
                  {stats.motivationScore >= 80 ? 'Excellent' : 
                   stats.motivationScore >= 60 ? 'Bon' : 
                   stats.motivationScore >= 40 ? 'Moyen' : 'À améliorer'}
                </p>
              </div>
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
