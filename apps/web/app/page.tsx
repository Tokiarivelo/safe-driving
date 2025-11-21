'use client';

import { useTranslation } from 'react-i18next';
import '@/app/i18n';

export default function HomePage() {
  const { t, i18n } = useTranslation();

  return (
    <main style={{ padding: 20 }}>
      <h1>{t('welcome_message')}</h1>

      <div style={{ marginBottom: 20 }}>
        <p>{t('site_description')}</p>
        <p>{t('contact_prompt')}</p>
        <p>{t('upcoming_features')}</p>
      </div>

      <div style={{ backgroundColor: '#f5f5f5', padding: 20, borderRadius: 8 }}>
        <h3>{t('authentication_section')}</h3>
        <p>{t('signin_prompt')}</p>
        <p>{t('welcome_back_message')}</p>
        <input placeholder={t('name_input_placeholder')} style={{ margin: '10px 0', padding: 8 }} />
      </div>

      <div style={{ marginTop: 30 }}>
        <button
          onClick={() => i18n.changeLanguage('fr')}
          style={{ marginRight: 10, padding: '8px 16px' }}
        >
          {t('french_button')}
        </button>
        <button onClick={() => i18n.changeLanguage('en')} style={{ padding: '8px 16px' }}>
          {t('english_button')}
        </button>
      </div>
    </main>
  );
}
