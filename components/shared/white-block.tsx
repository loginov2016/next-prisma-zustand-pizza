import { cn } from '@/lib/utils';
import { Title } from './title';
import React, { DetailedHTMLProps, HTMLAttributes } from 'react';

interface IWhiteBlockProps extends DetailedHTMLProps< HTMLAttributes<HTMLDivElement>, HTMLDivElement > {
  title?: string;
  endAdornment?: React.ReactNode;
  contentClassName?: string;
}

export const WhiteBlock: React.FC<IWhiteBlockProps> = ({ title, endAdornment, contentClassName, children, className }) => {
  return (
    <div className={cn('bg-white rounded-3xl', className)}>
        {
            title && (
                <div className="flex items-center justify-between p-5 px-7 border-b border-gray-100">
                    <Title text={title} size='sm' className="font-bold"/>
                    {endAdornment}
                </div>
            )
        }
        <div className={cn('p-5 py-4 pb-10', contentClassName)}>{children}</div>
    </div>
  );
}

