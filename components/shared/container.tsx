import { cn } from '@/lib/utils';
import React, { DetailedHTMLProps, HTMLAttributes } from 'react';

interface IContainerProps extends DetailedHTMLProps< HTMLAttributes<HTMLDivElement>, HTMLDivElement > {
 
}

export const Container: React.FC<React.PropsWithChildren<IContainerProps>> = ({ className, children }) => {
  return (
    <div className={cn('mx-auto max-w-[1280px]', className)}>
      {children}
    </div>
  );
};
