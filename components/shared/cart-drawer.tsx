'use client';

import { cn } from '@/lib/utils';
import React, { DetailedHTMLProps, HTMLAttributes } from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from 'next/link';
import { Button } from '../ui';
import { ArrowRight } from 'lucide-react';
import { CartDrawerItem } from './cart-drawer-item';
import { getCartItemDetails } from '@/lib';



interface ICartDrawerProps extends DetailedHTMLProps< HTMLAttributes<HTMLDivElement>, HTMLDivElement > {
  
}

export const CartDrawer: React.FC<ICartDrawerProps> = ({ children, className }) => {
  return (
    <Sheet>
        <SheetTrigger asChild>
            {children}
        </SheetTrigger>
        <SheetContent className='flex flex-col justify-between pb-0 bg-[#F4F1EE]'>
            <SheetHeader>
                <SheetTitle>
                    В корзине <span className="font-bold">3 товара</span>
                </SheetTitle>
            </SheetHeader>

            <div className="mt-5 overflow-auto flex-1">
                <div className="mb-2">
                    <CartDrawerItem 
                        id={1}
                        imageUrl='https://media.dodostatic.net/image/r:584x584/11EE7D61706D472F9A5D71EB94149304.webp'
                        details={getCartItemDetails(30, 2, [{name: 'сырный соус'}, {name:'томаты'}, {name: 'соус альфредо'}])}
                        name='Чоризо фреш'
                        price={521}
                        quantity={1}
                    />
                </div>
                <div className="mb-2">
                    <CartDrawerItem 
                        id={1}
                        imageUrl='https://media.dodostatic.net/image/r:584x584/11EE7D61706D472F9A5D71EB94149304.webp'
                        details={getCartItemDetails(30, 2, [{name: 'сырный соус'}, {name:'томаты'}, {name: 'соус альфредо'}])}
                        name='Чоризо фреш'
                        price={521}
                        quantity={1}
                    />
                </div>
                <div className="mb-2">
                    <CartDrawerItem 
                        id={1}
                        imageUrl='https://media.dodostatic.net/image/r:584x584/11EE7D61706D472F9A5D71EB94149304.webp'
                        details={getCartItemDetails(30, 2, [{name: 'сырный соус'}, {name:'томаты'}, {name: 'соус альфредо'}])}
                        name='Чоризо фреш'
                        price={521}
                        quantity={1}
                    />
                </div>
                <div className="mb-2">
                    <CartDrawerItem 
                        id={1}
                        imageUrl='https://media.dodostatic.net/image/r:584x584/11EE7D61706D472F9A5D71EB94149304.webp'
                        details={getCartItemDetails(30, 2, [{name: 'сырный соус'}, {name:'томаты'}, {name: 'соус альфредо'}])}
                        name='Чоризо фреш'
                        price={521}
                        quantity={1}
                    />
                </div>
                <div className="mb-2">
                    <CartDrawerItem 
                        id={1}
                        imageUrl='https://media.dodostatic.net/image/r:584x584/11EE7D61706D472F9A5D71EB94149304.webp'
                        details={getCartItemDetails(30, 2, [{name: 'сырный соус'}, {name:'томаты'}, {name: 'соус альфредо'}])}
                        name='Чоризо фреш'
                        price={521}
                        quantity={1}
                    />
                </div>
            </div>

            <SheetFooter className='bg-white p-8'>
                <div className="w-full">
                    <div className="flex mb-4">
                        <span className="flex flex-1 text-lg">
                            Итого
                            <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
                        </span>
                        <span className="font-bold text-lg">500 ₽</span>
                    </div>
                </div>
                <Link href='/cart'>
                    <Button 
                        className="w-full h-12 text-base"
                        type='submit'
                    >
                        Оформить заказ
                        <ArrowRight className='w-5 ml-2'/>
                    </Button>
                </Link>
            </SheetFooter>
        </SheetContent>
    </Sheet>
  );
}

