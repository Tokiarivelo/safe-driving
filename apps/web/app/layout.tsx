import ApolloWrapper from '@/lib/apollo/apollo-provider';
import { Toaster } from '@/components/ui/sonner';
import { SessionProvider } from 'next-auth/react';
import './global.css';

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <main>
          <SessionProvider refetchOnWindowFocus={false}>
            <ApolloWrapper>{children}</ApolloWrapper>
          </SessionProvider>
          <Toaster position="top-right" richColors closeButton />
        </main>
      </body>
    </html>
  );
}
