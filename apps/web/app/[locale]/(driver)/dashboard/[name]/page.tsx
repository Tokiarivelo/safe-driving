import { JSX } from 'react';

import Messages from '../../../../../components/user/components/Dashboard/messages/messages';

const pages: Record<string, JSX.Element> = {
  messages: <Messages/>
  
};

export default async function LoginPage({ params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;

  return pages[name];
}