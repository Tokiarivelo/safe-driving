import { type Locale } from '@/lib/i18n';
import './global.css';

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
        <main>{children}</main>
      </body>
    </html>
  );
}
