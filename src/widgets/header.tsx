import React from 'react';
import Link from 'next/link';
import { BellIcon, UserIcon } from '@/shared/ui';

type HeaderProps = {
  showActionButtons?: boolean;
};

export function Header({ showActionButtons = true }: HeaderProps) {
  return (
    <header className="flex items-center justify-between py-4">
      <div className="flex items-center gap-2">
        <Link href="/" className="text-indigo-600 font-bold text-2xl">
          연간 빙고
        </Link>
      </div>

      {showActionButtons && (
        <div className="flex items-center gap-4">
          <button className="p-2 rounded-full hover:bg-gray-100">
            <BellIcon size={20} />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100">
            <UserIcon size={20} />
          </button>
        </div>
      )}
    </header>
  );
}
