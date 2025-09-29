import { InfoBlock } from '@/components/shared';
import { getUserSession } from '@/lib/get-user-session';
import { cn } from '@/lib/utils';
import { redirect } from 'next/navigation';
import React, { DetailedHTMLProps, HTMLAttributes } from 'react';

interface INotAuthPageProps extends DetailedHTMLProps< HTMLAttributes<HTMLDivElement>, HTMLDivElement > {}

export default async function NotAuthPage({ className }: INotAuthPageProps) {
  const session  = await getUserSession();

  if (session) {
    return redirect('/profile');
  }

  return (
    <div className={cn('flex flex-col items-center justify-center my-40', className)}>
        <InfoBlock 
            title='Доступ запрещён'
            text='Данную страницу могут просматривать только зарегистрированные пользователи'
            imageUrl='/assets/images/lock.png'
        />
    </div>
  );
}

