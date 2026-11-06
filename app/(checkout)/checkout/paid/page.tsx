import { getUserOrder } from '@/app/actions';
import { InfoBlock, WhiteBlock } from '@/components/shared';
import { cn } from '@/lib/utils';
import { JSX} from 'react';



export default async function PaidPage({ searchParams }: { searchParams: Promise<{ orderId?: string }> }): Promise<JSX.Element> {
  //console.log('PaidPage');
  const { orderId } = await searchParams;

  const order = await getUserOrder(orderId);

  return (
    <WhiteBlock>
      <div className={cn('flex flex-col items-center justify-center my-40')}>
        {order.status === 'SUCCEEDED' && (
          <InfoBlock 
            title={`Оплата вашего заказа #${orderId} на сумму: ${order.totalAmount}₽ была успешна произведена!`}
            text='Вернитесь на Главную страницу'
            className='text-orange-500'
        />
        ) }
        {order.status === 'CANCELLED' && (
          <InfoBlock 
            title={`Оплата вашего заказа #${orderId} на сумму: ${order.totalAmount}₽ была отменена!`}
            text='Вернитесь на Главную страницу'
            className='text-orange-500'
        />
        ) }
        { order.status === 'PENDING' && (
          <InfoBlock 
            title={`Оплата вашего заказа #${orderId} на сумму: ${order.totalAmount}₽ в процессе!`}
            text='Пройдите по ссылке в вашем письме на оплату'
            className='text-orange-500'
        />
        ) }
        { !order && (
          <InfoBlock 
            title='Упс! Что-то пошло не так. Попробуйте ещё раз'
            text='Вернитесь на Главную страницу'
            className='text-orange-500'
            imageUrl='/assets/images/not-found.png'
          />
        ) }
      </div>
    </WhiteBlock>
  );
}