import LeftSidebarMenu from '@/components/sidebar/left-sidebar-menu';
import { DRIVER_MENUES } from './constants';

export default function DriverDAshboardLayout({ children }: { children: React.ReactNode }) {
  console.log('DRIVER_MENUES :>> ', DRIVER_MENUES);

  return (
    <div className="w-full h-screen">
      <div className="flex h-full flex-row">
        <LeftSidebarMenu menuItems={DRIVER_MENUES} />
        <div className="ml-5 w-full">{children}</div>
      </div>
    </div>
  );
}
