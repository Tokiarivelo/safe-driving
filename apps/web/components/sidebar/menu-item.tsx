'use client';

import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Icon } from '@iconify/react';
import ProgressLink from '@/components/ui/progress-link';
import { MenuItemProps } from './interfaces';

function MenuItem({ href, icon, name, isActive, badgeCount }: MenuItemProps) {
  return (
    <ProgressLink href={href}>
      <div
        className={`bg-white w-16 h-16 rounded-full border flex justify-center items-center relative ${isActive ? 'border-pink-600 shadow-md shadow-gray-400' : 'border-white'}`}
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
        {badgeCount !== undefined && badgeCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full min-w-5 h-5 flex items-center justify-center px-1">
            {badgeCount > 99 ? '99+' : badgeCount}
          </span>
        )}
      </div>
    </ProgressLink>
  );
}

export default MenuItem;
