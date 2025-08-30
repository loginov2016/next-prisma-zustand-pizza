/* eslint-disable @next/next/no-img-element */
import { cn } from '@/lib/utils';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

interface ICartItemDetailsImageProps extends DetailedHTMLProps< HTMLAttributes<HTMLImageElement>, HTMLImageElement > {
  src: string;
}

export const CartItemDetailsImage: React.FC<ICartItemDetailsImageProps> = ({ src, className }) => {
  // eslint-disable-next-line jsx-a11y/alt-text
  return <img className={cn('w-[60px] h-[60px]', className)} src={src} />;
};
