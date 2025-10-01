import { cn } from '@/lib/utils';
import Link from 'next/link';
import React from 'react';

interface ILegalInfoProps {
  className?: string;
}

export const LegalInfo: React.FC<ILegalInfoProps> = ({ className }) => {
  return (
    <div className={cn('flex flex-grow-1 flex-shrink-0 basis-auto h-10 gap-10 items-center', className)}>
      <div className='flex items-center text-white/60'>SUPER PIZZA © 2025</div>
      <Link className='text-white/60 hover:text-white' href='#'>Правовая информация</Link>
      <Link className='text-white/60 hover:text-white' href='#'>Калорийность и состав</Link>
    </div>
  );
}

