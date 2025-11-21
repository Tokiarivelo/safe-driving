'use client';

import Sidebare from '@/components/driver/dashboard/sidebare/sidebare';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-screen">
      <Sidebare />
      {children}
    </div>
  );
}
