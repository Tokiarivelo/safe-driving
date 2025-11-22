export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return <div className="bg-(--background) text-(--foreground)">{children}</div>;
}
