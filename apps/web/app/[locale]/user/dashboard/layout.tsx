'use client';

import LeftSidebarMenu from '@/components/driver/dashboard/sidebare/left-sidebar-menu';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-screen">
      <div className="flex h-full flex-row">
        <LeftSidebarMenu />
        <div className="ml-5 w-full">{children}</div>
      </div>
    </div>
  );
}
