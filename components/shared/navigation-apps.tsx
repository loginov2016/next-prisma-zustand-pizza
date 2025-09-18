import { cn } from '@/lib/utils';
import Link from 'next/link';
import React, { DetailedHTMLProps, HTMLAttributes } from 'react';

interface INavigationAppsProps extends DetailedHTMLProps< HTMLAttributes<HTMLDivElement>, HTMLDivElement > {}

export const NavigationApps: React.FC<INavigationAppsProps> = ({ className }) => {
  return (
    <div className={cn('', className)}>
        <div className="flex flex-wrap justify-end gap-3">
            <Link href='#'><img className='h-[40px]' src="/app-store.svg"   alt="app-store" /></Link>
            <Link href='#'><img className='h-[40px]' src="/ru-store.svg"    alt="ru-store" /></Link>
            <Link href='#'><img className='h-[40px]' src="/mi-app-mail.svg" alt="mi-app-mail" /></Link>
            <Link href='#'><img className='h-[40px]' src="/google-play.svg" alt="google-play" /></Link>
            <Link href='#'><img className='h-[40px]' src="/app-gallery.svg" alt="app-gallery" /></Link>
        </div>
    </div>
  );
}

