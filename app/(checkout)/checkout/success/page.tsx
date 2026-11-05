'use client';

import { getUserOrder } from '@/app/actions';
import { InfoBlock, WhiteBlock } from '@/components/shared';
import { cn } from '@/lib/utils';
import { cookies } from 'next/headers';
import { useEffect, useState } from 'react';



export default function SuccessPage() {
  console.log('SuccessPage');
  const [loading, setLoading] = useState<boolean>(true);
  const [orderId, setOrderId] = useState<number | null>(null);
  const [orderStatus, setOrderStatus] = useState<'PENDING' | 'SUCCEEDED' | 'CANCELLED' | null>(null);


  useEffect(() => {
    let timer = null;
    async function fetchOrderStatus() {
      try {
          setLoading(true);
          const order = await getUserOrder();
          //const cookieStore = cookies();
          //const orderId = (await cookieStore).get('order_id')?.value;
          if (!order) {
              throw new Error('Order not found');
          }
          console.log('STATUS: ', order.status);
          setOrderStatus(order.status);
          setOrderId(order.id);
      } catch (error) {
          console.error('[Get User Order] Server Error', error);
          throw new Error('[Get User Order] Server Error');
      } finally {
        setLoading(false);
      }
    }
    
    fetchOrderStatus();

    if (orderStatus === 'PENDING') {
      timer = setInterval(fetchOrderStatus, 3000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };

  }, [orderStatus]);
 

  return (
    <WhiteBlock>
      <div className={cn('flex flex-col items-center justify-center my-40')}>
        {orderStatus === 'SUCCEEDED' && (
          <InfoBlock 
            title={`Оплата вашего заказа #${orderId} была успешна произведена!`}
            text='Вернитесь на Главную страницу'
            className='text-orange-500'
        />
        ) }
        {orderStatus === 'CANCELLED' && (
          <InfoBlock 
            title={`Оплата вашего заказа #${orderId} была отменена!`}
            text='Вернитесь на Главную страницу'
            className='text-orange-500'
        />
        ) }
        { orderStatus === 'PENDING' && (
          <InfoBlock 
            title={`Оплата вашего заказа #${orderId} в процессе!`}
            text='проидите по ссылке в вашем письме на оплату'
            className='text-orange-500'
        />
        ) }
        { !orderStatus && (
          <InfoBlock 
            title='Упс! Что-то пошло не так. Попробуйте ещё раз.'
            text='Вернитесь на Главную страницу'
            className='text-orange-500'
            imageUrl='/assets/images/not-found.png'
          />
        ) }
      </div>
    </WhiteBlock>
  );
}

