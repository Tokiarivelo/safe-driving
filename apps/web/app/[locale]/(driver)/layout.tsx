import ApolloWrapper from '@/lib/apollo/apollo-provider';
import { Toaster } from '@/components/ui/sonner';
import { SessionProvider } from 'next-auth/react';
import { type Locale } from '@/lib/i18n';
import { ClientI18nProvider } from './client-i18n-provider';
import { ThemeProvider } from '@/lib/contexts/ThemeContext';
import '../../global.css';

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
      <body className="bg-[color:var(--background)] text-[color:var(--foreground)]">
        <SessionProvider refetchOnWindowFocus={false}>
          <ApolloWrapper>
            <ThemeProvider>
              <ClientI18nProvider locale={locale}>
                <main>
                  {children}
                </main>
              </ClientI18nProvider>
              <Toaster position="top-right" richColors closeButton />
            </ThemeProvider>
          </ApolloWrapper>
        </SessionProvider>
      </body>
    </html>
  );
}