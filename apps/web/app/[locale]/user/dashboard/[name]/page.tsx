import { JSX } from 'react';

import Messages from '../../../../../components/user/components/Dashboard/messages/messages';
import Rechercher from '../../../../../components/map/MapViewClientWrapper';

const pages: Record<string, JSX.Element> = {
  rechercher: <Rechercher/>,
  messages: <Messages/>
};

export default async function LoginPage({ params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;

  return pages[name];
}