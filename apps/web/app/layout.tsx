import { redirect } from 'next/navigation';
import { getLocale } from '@/lib/getLocale';
import { headers } from 'next/headers';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // This layout is for the root page only
  // The middleware will redirect to locale-based routes
  // But Next.js still requires a root layout
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
