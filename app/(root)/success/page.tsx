import { InfoBlock } from '@/components/shared';
import { cn } from '@/lib/utils';
import React from 'react';

interface ISuccessPageProps {
  className?: string;
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

