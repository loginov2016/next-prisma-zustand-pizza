'use client';

import { useForm, SubmitHandler, Form, FormProvider } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import React, { DetailedHTMLProps, HTMLAttributes } from 'react';
import { CheckoutCartBlock, CheckoutDeliveryAddressBlock, CheckoutPersonalDataBlock,  CheckoutSidebar, checkoutFormSchema, type TCheckoutFormSchema, Container, Title } from '@/components/shared';
import { useGetCart } from '@/hooks';

interface ICheckoutPageProps extends DetailedHTMLProps< HTMLAttributes<HTMLDivElement>, HTMLDivElement > {}

export default function CheckoutPage() {
    const { totalAmount, cartItems, removeCartItem, onClickCountButton } = useGetCart();

    const form = useForm<TCheckoutFormSchema>({
        resolver: zodResolver(checkoutFormSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            address: '',
            comment: '',
        }
    });
    
    const onSubmitForm: SubmitHandler<TCheckoutFormSchema> = (data) => {
        console.log(data);
    }

    return (
        <Container className='mt-10'>
            <Title text='Оформление заказа' className='font-extrabold mb-8 text-[36px]'/>
            <FormProvider {...form} >
                <form onSubmit={form.handleSubmit(onSubmitForm)}>
                    <div className="flex gap-10">
                        {/* Левая часть */}
                        <div className='flex flex-col gap-10 flex-1 mb-20'>
                            <CheckoutCartBlock cartItems={cartItems} removeCartItem={removeCartItem} onClickCountButton={onClickCountButton} />
                            <CheckoutPersonalDataBlock />
                            <CheckoutDeliveryAddressBlock />
                        </div>
                        {/* Правая часть */}
                        <div className='w-[450px]'>
                            <CheckoutSidebar totalAmount={totalAmount} />
                        </div>
                    </div>
                </form>
            </FormProvider>
        </Container>
    );
}

