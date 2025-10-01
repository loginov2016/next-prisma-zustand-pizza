import { cn } from '@/lib/utils';
import React from 'react';
import { WhiteBlock } from '../white-block';
import { FormInput } from '../form';



interface ICheckoutPersonalDataBlockProps {
    className?: string;
}

export const CheckoutPersonalDataBlock: React.FC<ICheckoutPersonalDataBlockProps> = ({ className }) => {
    
    return (
        <WhiteBlock title='2. Персональные данные' className={cn('', className)}>
            <div className="grid grid-cols-2 gap-5">
                <FormInput name='firstName' className='text-base' placeholder='Имя'     />
                <FormInput name='lastName'  className='text-base' placeholder='Фамилия' />
                <FormInput name='email'     className='text-base' placeholder='E-mail'  />
                <FormInput name='phone'     className='text-base' placeholder='Телефон' /> 
            </div>
        </WhiteBlock>
    );
}

