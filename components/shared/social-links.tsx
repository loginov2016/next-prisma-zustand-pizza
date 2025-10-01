/* eslint-disable @next/next/no-img-element */
import { cn } from '@/lib/utils';
import Link from 'next/link';
import React from 'react';

interface ISocialNetworkProps {
  className?: string;
}

export const SocialLinks: React.FC<ISocialNetworkProps> = ({ className }) => {
  return (
    <div className={cn('flex flex-grow-0 flex-shrink-1 basis-auto min-h-[40px]', className)}>
      <div className='flex flex-wrap gap-3'>
        <Link href='#' className='w-[40px] h-[40px] p-2 rounded-[20px] bg-[rgb(36,36,36)] justify-center items-center flex transition-transform duration-300 hover:scale-120'><img src="/ok.svg" alt="ok" /></Link>
        <Link href='#' className='w-[40px] h-[40px] p-2 rounded-[20px] bg-[rgb(36,36,36)] justify-center items-center flex transition-transform duration-300 hover:scale-120'><img src="/vk.svg" alt="vk" /></Link>
        <Link href='#' className='w-[40px] h-[40px] p-2 rounded-[20px] bg-[rgb(36,36,36)] justify-center items-center flex transition-transform duration-300 hover:scale-120'><img src="/youtube.svg" alt="youtube" /></Link>
      </div>
    </div>
  );
}

