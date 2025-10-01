'use client';

import { useForm, SubmitHandler, FormProvider } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from 'react';
import { CheckoutCartBlock, CheckoutDeliveryAddressBlock, CheckoutPersonalDataBlock,  CheckoutSidebar, checkoutFormSchema, type TCheckoutFormSchema, Container, Title } from '@/components/shared';
import { useGetCart } from '@/hooks';
import { cn } from "@/lib/utils";
import { createOrder } from "@/app/actions";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { Api } from "@/services/api-client";
import { useRouter } from "next/navigation";


export default function CheckoutPage() {
    const router = useRouter();
    const [buttonLoading, setButtonLoading] = React.useState(false);
    const { totalAmount, cartItems, removeCartItem, onClickCountButton, loading } = useGetCart();
    const { data: session } = useSession();

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
    
    useEffect(() => {
        async function fetchUserInfo() {
            const data = await Api.auth.getMe();
            const [firstName, lastName] = data.fullName.split(' ');
            form.setValue('firstName', firstName);
            form.setValue('lastName', lastName);
            form.setValue('email', data.email);
        }


        if ( session ) {
            fetchUserInfo()
        }
    }, [session, form]); // Поставил зависимость form

    useEffect(() => {
        if (cartItems.length === 0) {
            router.push('/');
        }
    }, [cartItems, router]);

    const onSubmitForm: SubmitHandler<TCheckoutFormSchema> = async (data) => {
        //console.log(data);
        //createOrder(data);
        try {
            setButtonLoading(true);
            const url = await createOrder(data);

            toast.success('Заказ успешно оформлен! Переход на оплату...', {icon: '✅'});

            if (url) {
                window.location.href = url;
            }
        } catch (error) {
            console.log(error);
            setButtonLoading(false);
            toast.error('Не удалось создать заказ!', {icon: '❌'});
        } 
    }

    return (
        <Container className='mt-10'>
            <Title text='Оформление заказа' className='font-extrabold mb-8 text-[36px]'/>
            <FormProvider {...form} >
                <form onSubmit={form.handleSubmit(onSubmitForm)}>
                    <div className="flex gap-10">
                        {/* Левая часть */}
                        <div className='flex flex-col gap-10 flex-1 mb-20'>
                            <CheckoutCartBlock loading={loading} cartItems={cartItems} removeCartItem={removeCartItem} onClickCountButton={onClickCountButton} />
                            <CheckoutPersonalDataBlock className={cn('', {'opacity-50 pointer-events-none': loading})} />
                            <CheckoutDeliveryAddressBlock className={cn('', {'opacity-50 pointer-events-none': loading})} />
                        </div>
                        {/* Правая часть */}
                        <div className='w-[450px]'>
                            <CheckoutSidebar 
                                totalAmount={totalAmount} 
                                loading={loading || buttonLoading}
                            />
                        </div>
                    </div>
                </form>
            </FormProvider>
        </Container>
    );
}

