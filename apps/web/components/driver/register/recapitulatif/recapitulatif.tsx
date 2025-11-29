'use client';

import { Button } from '@/components/ui/button';
import {
  useGetMyUserPreferenceQuery,
  useGetVehiclesQuery,
  useMeQuery,
} from '@/graphql/generated/graphql';
import ProgressLink from '@/components/ui/progress-link';
import { useTranslation } from 'react-i18next';
import styles from './recapitulatif.module.css';
import { useQrCodeForRecap } from './useAction';

export function Recap() {
  const { t } = useTranslation(['registerDriver/step11']);

  const { data: userDataRes, loading: loadingUser } = useMeQuery();
  const { data: vehicleDataRes, loading: loadingVehicle } = useGetVehiclesQuery();
  const { data: prefDataRes, loading: loadingPref } = useGetMyUserPreferenceQuery();
  const { handleCreateQrAndRedirect, loading } = useQrCodeForRecap();

  const userData = userDataRes?.me;
  const vehicles = vehicleDataRes?.vehicles || [];
  const userPref = prefDataRes?.userPreference;

  const uploadedDocsCount = userData?.UserDocument?.length ?? 0;
  const gpsStatus = userPref?.activateLocation ? 'Activé' : 'Désactivé';
  const notificationsStatus = userPref?.activateNotifications ? 'Email, Push' : 'Aucune';
  const language = userPref?.language ?? '-';
  const theme = userPref?.theme ?? '-';

  if (loadingUser || loadingVehicle || loadingPref) {
    return <div className="flex justify-center items-center h-screen">Chargement...</div>;
  }

  return (
    <div className="w-full px-4 py-8">
      <div className={styles.contentContainer}>
        <div className={styles.textContainer}>
          <h1 className={styles.title}>{t('title')}</h1>
          <p className={styles.subtitle}>{t('subtitle')}</p>
        </div>

        <div className="space-y-8">
          {/* Infos personnelles */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>Infos personnelles</h2>
              <ProgressLink href="/personalInfo">
                <Button variant="outline" size="sm">
                  Modifier
                </Button>
              </ProgressLink>
            </div>
            <p>
              Nom : {userData?.firstName} {userData?.lastName}
            </p>
            <p>Email : {userData?.email}</p>
            <p>Téléphone : {userData?.phone}</p>
            <p>Photos uploadées : {uploadedDocsCount}</p>
          </div>

          {/* Véhicules */}
          {vehicles.map(vehicle => (
            <div key={vehicle.id} className={styles.card}>
              <div className={styles.cardHeader}>
                <h2 className={styles.cardTitle}>Véhicule</h2>
                <ProgressLink href={`/vehiculeInfo`}>
                  <Button variant="outline" size="sm">
                    Modifier
                  </Button>
                </ProgressLink>
              </div>
              <p>Type : {vehicle.type?.name || '-'}</p>
              <p>Marque : {vehicle.brand || '-'}</p>
              <p>Modèle : {vehicle.model || '-'}</p>
              <p>Immatriculation : {vehicle.registrationNumber || '-'}</p>
              <p>Nombre de place : {vehicle.place}</p>
              <p>Documents uploadés : {vehicle.VehicleDocument?.length || 0}</p>
              <p>Photos uploadées : {vehicle.VehicleImage?.length || 0}</p>
            </div>
          ))}

          {/* Préférences */}
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Préférences</h2>
            <p>GPS : {gpsStatus}</p>
            <p>Notifications : {notificationsStatus}</p>
          </div>

          {/* Langue & Thème */}
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Langue & Thème</h2>
            <p>Langue : {language}</p>
            <p>Thème : {theme}</p>
          </div>

          <div className="text-center">
            <Button
              variant="default"
              onClick={handleCreateQrAndRedirect}
              disabled={loading}
              className={styles.buttonPrimary}
            >
              {loading ? 'Création du QR code...' : 'Continuer'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
