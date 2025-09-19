import { cn } from '@/lib/utils';
import React, { DetailedHTMLProps, HTMLAttributes } from 'react';
import { WhiteBlock } from './white-block';
import { Input } from '../ui';

interface ICheckoutPersonalDataBlockProps extends DetailedHTMLProps< HTMLAttributes<HTMLDivElement>, HTMLDivElement > {}

export const CheckoutPersonalDataBlock: React.FC<ICheckoutPersonalDataBlockProps> = ({ className }) => {
    return (
        <WhiteBlock title='2. Персональные данные' className={cn('', className)}>
            <div className="grid grid-cols-2 gap-5">
                <Input name='firstname' className='text-base' placeholder='Имя' />
                <Input name='lastname'  className='text-base' placeholder='Фамилия' />
                <Input name='email'     className='text-base' placeholder='E-mail' />
                <Input name='phone'     className='text-base' placeholder='Телефон' /> 
            </div>
        </WhiteBlock>
    );
}

