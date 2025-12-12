import { MenuItemProps } from '../../../../../components/sidebar/interfaces';

export const DRIVER_MENUES: MenuItemProps[] = [
  {
    name: 'Home',
    href: '/driver/dashboard',
    icon: 'mdi:home-outline',
  },
  {
    name: 'Rechercher',
    href: '/driver/dashboard/search',
    icon: 'material-symbols:search-rounded',
  },
  {
    name: 'Messages',
    href: '/driver/dashboard/messages',
    icon: 'streamline-ultimate-color:messages-logo',
  },
  {
    name: 'Mes Courses',
    href: '/driver/dashboard/rides',
    icon: 'streamline-kameleon-color:map',
  },
  {
    name: 'Statistiques',
    href: '/driver/dashboard/stats',
    icon: 'mdi:chart-line',
  },
  {
    name: 'Scanner Qr Code',
    href: '/driver/dashboard/scan',
    icon: 'iconoir:scan-qr-code',
  },
  {
    name: 'Notifications',
    href: '/driver/dashboard/notifications',
    icon: 'streamline-sharp-color:bell-notification-flat',
  },
  {
    name: 'Trajet en Cours',
    href: '/driver/dashboard/realtime-ride',
    icon: 'icon-park:gps',
  },
  {
    name: 'Profil',
    href: '/driver/dashboard/profile',
    icon: 'mdi:account',
  },
  {
    name: 'Paramètres',
    href: '/driver/dashboard/settings',
    icon: 'mdi:cog',
  },
  {
    name: 'Assistance',
    href: '/driver/dashboard/support',
    icon: 'flat-color-icons:online-support',
  },
];
