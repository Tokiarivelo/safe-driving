import { NotificationsList } from '@/components/notifications';

export default function UserNotificationsPage() {
  return (
    <div className="h-full p-4">
      <NotificationsList userType="user" />
    </div>
  );
}
