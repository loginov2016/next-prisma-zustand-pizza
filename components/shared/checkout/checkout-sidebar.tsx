import { cn } from '@/lib/utils';
import React, { DetailedHTMLProps, HTMLAttributes } from 'react';
import { WhiteBlock } from '../white-block';
import { CheckoutItemDetails } from './checkout-item-details';
import { ArrowRight, Package, Percent, Truck } from 'lucide-react';
import { Button } from '../../ui';

const VAT = 15; // Процент НДС
const DELIVERY_PRICE = 240; // Стоимость доставки

interface ICheckoutSidebarProps extends DetailedHTMLProps< HTMLAttributes<HTMLDivElement>, HTMLDivElement > {
    totalAmount: number;
}

export const CheckoutSidebar: React.FC<ICheckoutSidebarProps> = ({ totalAmount, className }) => {
    const vatPrice = totalAmount * VAT / 100;
    const totalPrice = totalAmount + vatPrice + DELIVERY_PRICE;


    return (
        <WhiteBlock className={cn('p-6 sticky top-4', className)}>
            <div className="flex flex-col gap-1">
                <span className="text-xl">Итоговая цена:</span>
                <span className="text-[34px] font-extrabold">{totalPrice} ₽</span>
            </div>
            <CheckoutItemDetails title={
                <div className='flex items-center'> 
                    <Package size={20} className='text-gray-300 mr-2'/>
                    Стоимость корзины:
                </div>
            } value={`${totalAmount} ₽`} className='' />
            <CheckoutItemDetails title={
                        <div className='flex items-center'> 
                            <Percent size={20} className='text-gray-300 mr-2'/>
                            Налоги:
                        </div>
                    } value={`${vatPrice} ₽`} className='' />
            <CheckoutItemDetails title={
                        <div className='flex items-center'> 
                            <Truck size={20} className='text-gray-300 mr-2'/>
                            Доставка:
                        </div>
                    } value={`${DELIVERY_PRICE} ₽`} className='' />
            <Button className="w-full h-14 rounded-2xl mt-6 text-base font-bold">
                Перейти к оплате
                <ArrowRight className='w-5 ml-2'/>
            </Button>
        </WhiteBlock>
    );
}

