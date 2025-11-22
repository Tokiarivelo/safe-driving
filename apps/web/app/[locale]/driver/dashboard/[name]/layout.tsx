import LeftSidebarMenu from '@/components/driver/dashboard/sidebare/left-sidebar-menu';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="w-full h-screen">
        <LeftSidebarMenu />
        {children}
      </div>
    </>
  );
}
