import LeftSidebarMenu from '@/components/sidebar/left-sidebar-menu';
import { USER_MENUES } from './constants';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-screen">
      <div className="flex h-full flex-row">
        <LeftSidebarMenu menuItems={USER_MENUES} />
        <div className="ml-5 w-full">{children}</div>
      </div>
    </div>
  );
}
