import '../global.css';

export const metadata = {
  title: 'SafeDriving.page - Votre espace créatif',
  description: 'Créez et gérez vos pages personnalisées',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-secondary from-gray-900 to-gray-800 text-white">
      <main className="pt-16 pb-24">
        {/* Compensation pour la navbar fixe */}
        {children}
      </main>
    </div>
  );
}
