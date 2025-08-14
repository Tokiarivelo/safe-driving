import { JSX } from 'react';
import BjrForm from '../../../../../../components/user/components/bjr/bjr';
import NotificationForm from '../../../../../../components/user/components/notification/notification';
import GpsForm from '../../../../../../components/user/components/gps/gps';
import RecapitulatifForm from '../../../../../../components/user/components//recapitulatif/recapitulatif';
import PreferenceForm from '../../../../../../components/user/components/preference/preference';

const pages: Record<string, JSX.Element> = {
  bjr: <BjrForm />,
  gps: <GpsForm />,
  notification: <NotificationForm />,
  recapitulatif: <RecapitulatifForm />,
  preference: <PreferenceForm />,
};

export default async function LoginPage({ params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;

  return pages[name];
}