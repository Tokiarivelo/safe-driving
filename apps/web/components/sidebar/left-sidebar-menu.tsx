'use client';

import React from 'react';

import { useMeQuery } from '@/graphql/generated/graphql';
import { usePathname } from 'next/navigation';
import { MenuItemProps } from './interfaces';
import MenuItem from './menu-item';

interface LeftSidebarMenuProps {
  menuItems: MenuItemProps[];
}

function LeftSidebarMenu({ menuItems }: LeftSidebarMenuProps) {
  const { data } = useMeQuery({
    fetchPolicy: 'cache-and-network',
    errorPolicy: 'all',
  });

  // get location
  const location = usePathname();

  function stringToColor(str: string) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const color = `hsl(${hash % 360}, 70%, 50%)`;
    return color;
  }
  const bgColor = stringToColor(`${data?.me?.firstName}${data?.me?.lastName}`);

  return (
    <div className="w-16 h-auto z-100 ml-5 mt-3">
      <div className="w-16 h-16 mb-5 flex justify-center items-center rounded-full border-2 border-pink-600">
        <div
          className="text-white flex justify-center items-center w-14 h-14 rounded-full"
          style={{ backgroundColor: bgColor }}
        >
          {data?.me?.firstName?.[0]}
          {data?.me?.lastName?.[0]}
        </div>
      </div>
      <div className="bg-white w-16 h-auto space-y-4 rounded-full shadow-auth-card">
        {menuItems.map((item, index) => (
          <div key={index}>
            <MenuItem {...item} isActive={location.endsWith(item.href)} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default LeftSidebarMenu;
