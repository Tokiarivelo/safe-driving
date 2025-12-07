import { MenuItemProps } from '../../../../../components/sidebar/interfaces';

export const USER_MENUES: MenuItemProps[] = [
  {
    name: 'Home',
    href: '/user/dashboard',
    icon: 'mdi:home-outline',
  },
  {
    name: 'Rechercher',
    href: '/user/dashboard/rechercher',
    icon: 'material-symbols:search-rounded',
  },
  {
    name: 'Messages',
    href: '/user/dashboard/messages',
    icon: 'streamline-ultimate-color:messages-logo',
  },
  {
    name: 'Mes Courses',
    href: '/user/dashboard/rides',
    icon: 'streamline-kameleon-color:map',
  },
  {
    name: 'Scanner Qr Code',
    href: '/user/dashboard/scan',
    icon: 'iconoir:scan-qr-code',
  },
  {
    name: 'Notifications',
    href: '/user/dashboard/notifications',
    icon: 'streamline-sharp-color:bell-notification-flat',
  },
  {
    name: 'Trajet en Cours',
    href: '/user/dashboard/realtime-ride',
    icon: 'icon-park:gps',
  },
  {
    name: 'Profil',
    href: '/user/dashboard/profile',
    icon: 'mdi:account',
  },
  {
    name: 'Paramètres',
    href: '/user/dashboard/settings',
    icon: 'mdi:cog',
  },
  {
    name: 'Assistance',
    href: '/user/dashboard/support',
    icon: 'flat-color-icons:online-support',
  },
];
