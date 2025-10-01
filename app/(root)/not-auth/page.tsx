import { InfoBlock } from '@/components/shared';
import { getUserSession } from '@/lib/get-user-session';
import { cn } from '@/lib/utils';
import { redirect } from 'next/navigation';
import React from 'react';


export default async function NotAuthPage() {
  const session  = await getUserSession();

  if (session) {
    return redirect('/profile');
  }

  return (
    <div className={cn('flex flex-col items-center justify-center my-40')}>
        <InfoBlock 
            title='Доступ запрещён'
            text='Данную страницу могут просматривать только зарегистрированные пользователи'
            imageUrl='/assets/images/lock.png'
        />
    </div>
  );
}

