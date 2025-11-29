import { ProgressBar, ProgressBarProvider } from 'react-transition-progress';

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
        <ProgressBarProvider>
          {/* I.e. using Tailwind CSS to show the progress bar with custom styling */}
          <ProgressBar className="fixed h-1 shadow-lg shadow-sky-500/20 bg-sky-500 top-0 z-50" />

          <main>{children}</main>
        </ProgressBarProvider>
      </body>
    </html>
  );
}
