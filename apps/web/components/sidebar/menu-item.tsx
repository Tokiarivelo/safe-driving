'use client';

import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import { MenuItemProps } from './interfaces';

function MenuItem({ href, icon, name, isActive }: MenuItemProps) {
  return (
    <Link href={href}>
      <div
        className={`bg-white w-16 h-16 rounded-full border flex justify-center items-center ${isActive ? 'border-pink-600 shadow-md shadow-gray-400' : 'border-white'}`}
      >
        <Tooltip>
          <TooltipTrigger className="p-2 rounded-full cursor-pointer">
            <Icon
              icon={icon}
              width="30"
              height="30"
              className="text-[#FF7F41] cursor-pointer hover:scale-120 transition-transform duration-200"
            />
          </TooltipTrigger>
          <TooltipContent side="right" align="center">
            <p>{name}</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </Link>
  );
}

export default MenuItem;
