import { CheckoutCartItem, CheckoutItemDetails, Container, Title, WhiteBlock } from '@/components/shared';
import { Button, Input, Textarea } from '@/components/ui';
import { cn } from '@/lib/utils';
import { ArrowRight, Car, Package, Percent, Truck } from 'lucide-react';
import React, { DetailedHTMLProps, HTMLAttributes } from 'react';

interface ICheckoutPageProps extends DetailedHTMLProps< HTMLAttributes<HTMLDivElement>, HTMLDivElement > {}

export default function CheckoutPage() {
  return (
    <Container className='mt-10'>
        <Title text='Оформление заказа' className='font-extrabold mb-8 text-[36px]'/>

        <div className="flex gap-10">
            {/* Левая часть */}
            <div className='flex flex-col gap-10 flex-1 mb-20'>
                <WhiteBlock title='1. Корзина'>
                    <div className="flex flex-col gap-5">
                        <CheckoutCartItem 
                        id={1} details='Большая конфета Россия Классическая с присыпкой в шоколаде, 200 г'
                        name='Пицца с сыром' 
                        price={300} 
                        imageUrl='https://media.dodostatic.net/image/r:584x584/11EE7D61706D472F9A5D71EB94149304.webp' 
                        quantity={3} 
                        />
                        <CheckoutCartItem 
                            id={1} details='Большая конфета Россия Классическая с присыпкой в шоколаде, 200 г'
                            name='Пицца с сыром' 
                            price={300} 
                            imageUrl='https://media.dodostatic.net/image/r:584x584/11EE7D61706D472F9A5D71EB94149304.webp' 
                            quantity={3} 
                        />
                    </div>
                </WhiteBlock>
                <WhiteBlock title='2. Персональные данные'>
                    <div className="grid grid-cols-2 gap-5">
                        <Input name='firstname' className='text-base' placeholder='Имя' />
                        <Input name='lastname'  className='text-base' placeholder='Фамилия' />
                        <Input name='email'     className='text-base' placeholder='E-mail' />
                        <Input name='phone'     className='text-base' placeholder='Телефон' /> 
                    </div>
                </WhiteBlock>
                <WhiteBlock title='3. Адрес доставки'>
                    <div className="flex flex-col gap-5">
                        <Input name='adress' className='text-base' placeholder='Введите свой адрес' />
                        <Textarea
                            className='text-base'
                            placeholder='Комментарий к заказу'
                            rows={5}
                        />
                    </div>
                </WhiteBlock>

            </div>

            {/* Правая часть */}
            <div className='w-[450px]'>
                <WhiteBlock className='p-6 sticky top-4'>
                    <div className="flex flex-col gap-1">
                        <span className="text-xl">Итого:</span>
                        <span className="text-[34px] font-extrabold">3700 ₽</span>
                    </div>

                    <CheckoutItemDetails title={
                        <div className='flex items-center'> 
                            <Package size={20} className='text-gray-300 mr-2'/>
                            Стоимость товаров:
                        </div>
                    } value='3700 ₽' className='' />
                    <CheckoutItemDetails title={
                        <div className='flex items-center'> 
                            <Percent size={20} className='text-gray-300 mr-2'/>
                            Налоги:
                        </div>
                    } value='240 ₽' className='' />
                    <CheckoutItemDetails title={
                        <div className='flex items-center'> 
                            <Truck size={20} className='text-gray-300 mr-2'/>
                            Доставка:
                        </div>
                    } value='120 ₽' className='' />
                    <Button className="w-full h-14 rounded-2xl mt-6 text-base font-bold">
                        Перейти к оплате
                        <ArrowRight className='w-5 ml-2'/>
                    </Button>
                </WhiteBlock>
            </div>
        </div>
    </Container>
  );
}

