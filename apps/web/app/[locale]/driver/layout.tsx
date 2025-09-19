export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[color:var(--background)] text-[color:var(--foreground)]">{children}</div>
  );
}
