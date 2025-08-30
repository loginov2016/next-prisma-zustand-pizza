import { cn } from '@/lib/utils';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

interface ICartItemInfoProps extends DetailedHTMLProps< HTMLAttributes<HTMLDivElement>, HTMLDivElement > {
  name: string;
  details: string;
}

export const CartItemInfo: React.FC<ICartItemInfoProps> = ({ name, details, className }) => {
  return (
    <div>
      <div className={cn('flex items-center justify-between', className)}>
        <h2 className="text-lg font-bold flex-1 leading-6">{name}</h2>
      </div>
      {details && <p className="text-xs text-gray-400 w-[90%]">{details}</p>}
    </div>
  );
};
