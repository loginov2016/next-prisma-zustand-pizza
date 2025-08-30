import { cn } from '@/lib/utils';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

interface ICartItemDetailsPriceProps extends DetailedHTMLProps< HTMLAttributes<HTMLDivElement>, HTMLDivElement > {
  value: number;
}

export const CartItemDetailsPrice: React.FC<ICartItemDetailsPriceProps> = ({ value, className }) => {
  return <h2 className={cn('font-bold', className)}>{value} ₽</h2>;
};
