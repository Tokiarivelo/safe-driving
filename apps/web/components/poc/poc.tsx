'use client';

import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from '../language/language-switcher';
import { UploadComponent } from '../ui/upload';
import { ChatContainer } from '../chat/chat-container';
import LogoutButton from '../auth/LogoutButton/LogoutButton';

export default function Poc() {
  const { t, ready } = useTranslation('accueil');

  if (!ready) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex w-full min-h-screen overflow-hidden relative">
      <header className="mb-8">
        <LanguageSwitcher />
        <LogoutButton />
      </header>

      <div className="flex flex-col items-center justify-center w-full p-4">
        <div className="inset-0 z-0">{t('title')}</div>
        <UploadComponent />
        <ChatContainer />
      </div>
    </div>
  );
}
