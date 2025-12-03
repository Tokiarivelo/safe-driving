'use client';

import ScanQrCodeComponent from '@/components/driver/dashboard/scan/scan';

export default function UserScanPage() {
  return <ScanQrCodeComponent redirectPath="/user/dashboard/messages" />;
}
