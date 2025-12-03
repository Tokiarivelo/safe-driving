import { JSX } from 'react';
import BjrForm from '../../../../../../components/user/components/Form/bjr/bjr';
import NotificationForm from '../../../../../../components/user/components/Form/notification/notification';
import GpsForm from '../../../../../../components/user/components/Form/gps/gps';
import RecapitulatifForm from '../../../../../../components/user/components/Form/recapitulatif/recapitulatif';
import PreferenceForm from '../../../../../../components/user/components/Form/preference/preference';

const pages: Record<string, JSX.Element> = {
  bjr: <BjrForm />,
  gps: <GpsForm />,
  notification: <NotificationForm />,
  recapitulatif: <RecapitulatifForm />,
  preference: <PreferenceForm />,
};

export default async function FormPage({ params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;

  return pages[name];
}
