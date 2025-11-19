export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // This layout is for the root page only
  // The middleware will redirect to locale-based routes
  // But Next.js still requires a root layout
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
