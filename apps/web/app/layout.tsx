import { type Locale } from '@/lib/i18n';
import './global.css';
import LoadingIndicator from '@/components/ui/loading-indicator/loading-indicator';

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
  manifest: '/manifest.json',
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
      <body suppressHydrationWarning>
        <LoadingIndicator />
        <main>{children}</main>
      </body>
    </html>
  );
}
