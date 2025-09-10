import ApolloWrapper from '@/lib/apollo/apollo-provider';
import { Toaster } from '@/components/ui/sonner';
import { SessionProvider } from 'next-auth/react';
import { type Locale } from '@/lib/i18n';
import { ClientI18nProvider } from './client-i18n-provider';
import '../global.css';
import { SocketProvider } from '@/lib/socket.io/SocketProvider';

export const metadata = {
  title: {
    default: 'Safe Driving',
    template: '%s | Safe Driving', // tout titre passé sera injecté ici
  },
  description: 'Le site officiel de Safe Driving',
  icons: {
    // favicon par défaut (affiché dans l’onglet du navigateur)
    icon: '/logo.svg',
    // balise <link rel="shortcut icon" ...>
    shortcut: '/logo.svg',
    // icône pour iOS / Safari
    apple: '/logo.svg',
  },
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  return (
    <html lang={locale}>
      <body>
        <main>
          <SocketProvider>
            <ClientI18nProvider locale={locale}>
              <SessionProvider refetchOnWindowFocus={false}>
                <ApolloWrapper>{children}</ApolloWrapper>
                <Toaster position="top-right" richColors closeButton />
              </SessionProvider>
            </ClientI18nProvider>
          </SocketProvider>
        </main>
      </body>
    </html>
  );
}
