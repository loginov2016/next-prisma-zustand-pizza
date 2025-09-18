import { cn } from '@/lib/utils';
import React, { DetailedHTMLProps, HTMLAttributes } from 'react';

interface IFranchiseStatsProps extends DetailedHTMLProps< HTMLAttributes<HTMLDivElement>, HTMLDivElement > {}

export const FranchiseStats: React.FC<IFranchiseStatsProps> = ({ className }) => {
  return (
    <div className={cn('flex flex-grow-1 flex-shrink-1 basis-auto', className)}>
      <div className="flex gap-4 whitespace-pre">
        <div className='d-block'>
            <p className='font-[700] text-[24px] leading-[28px] mb-2'>5&nbsp;509&nbsp;271&nbsp;792 ₽</p>
            <span className='text-white/60 font-[500] text-[14px] leading-[18px]'>Выручка российской сети в этом месяце</span>
        </div>
        <div className='d-block'>
            <p className='font-[700] text-[24px] leading-[28px] mb-2'>1361 пиццерия</p>
            <span className='text-white/60 font-[500] text-[14px] leading-[18px]'>В 26 странах.
            От Турции до Нигерии</span>
        </div>
      </div>
    </div>
  );
}

