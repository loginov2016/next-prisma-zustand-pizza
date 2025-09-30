import { InfoBlock } from '@/components/shared';
import { cn } from '@/lib/utils';
import React, { DetailedHTMLProps, HTMLAttributes } from 'react';

interface ISuccessPageProps extends DetailedHTMLProps< HTMLAttributes<HTMLDivElement>, HTMLDivElement > {
  
}

export default function SuccessPage({ className }: ISuccessPageProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center my-40', className)}>
        <InfoBlock 
            title='Оплата успешна произведена!'
            text='Вернитесь на Главную страницу'
            className='text-orange-500'
        />
    </div>
  );
}

