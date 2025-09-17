import ApolloWrapper from '@/lib/apollo/apollo-provider';
import { Toaster } from '@/components/ui/sonner';
import { SessionProvider } from 'next-auth/react';
import { type Locale } from '@/lib/i18n';
import { ClientI18nProvider } from './client-i18n-provider';
import '../global.css';
import { SocketProvider } from '@/lib/socket.io/SocketProvider';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import ThemeScript from '@/components/ThemeScript';

export const metadata = {
  title: {
    default: 'Safe Driving',
    template: '%s | Safe Driving',
  },
  description: 'Le site officiel de Safe Driving',
  icons: {
    icon: '/logo.svg',
    shortcut: '/logo.svg',
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
    <html lang={locale} suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body suppressHydrationWarning>
        <main>
          <SocketProvider>
            <ClientI18nProvider locale={locale}>
              <SessionProvider refetchOnWindowFocus={false}>
                <ApolloWrapper>
                  <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                    storageKey="safe-drive-theme"
                  >
                    {children}
                  </ThemeProvider>
                </ApolloWrapper>
                <Toaster position="top-right" richColors closeButton />
              </SessionProvider>
            </ClientI18nProvider>
          </SocketProvider>
        </main>
      </body>
    </html>
  );
}