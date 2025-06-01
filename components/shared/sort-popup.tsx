import { cn } from '@/lib/utils';
import { ArrowUpDown } from 'lucide-react';
import React, { DetailedHTMLProps, HTMLAttributes } from 'react';

interface ISortPopupProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  
}

export const SortPopup: React.FC<ISortPopupProps> = ({ className }) => {
  return (
    <div className={cn('inline-flex items-center gap-1 bg-gray-50 px-5 h-[52px] rounded-2xl cursor-pointer', className)}>
      <ArrowUpDown size={16} />
      <b>Сортировка:</b>
      <b className="text-primary">Популярное</b>
    </div>
  );            
}

