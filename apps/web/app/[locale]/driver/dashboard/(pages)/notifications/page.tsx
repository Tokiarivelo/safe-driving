import { NotificationsList } from '@/components/notifications';

export default function DriverNotificationsPage() {
  return (
    <div className="h-full p-4">
      <NotificationsList userType="driver" />
    </div>
  );
}
