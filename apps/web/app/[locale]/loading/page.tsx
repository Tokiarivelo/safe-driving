import RedirectHandler from '@/components/loading/RedirectHandler';

export const metadata = {
  title: 'Chargement',
  description: 'Redirection en cours...',
};

export default function LoadingPage() {
  return <RedirectHandler />;
}
