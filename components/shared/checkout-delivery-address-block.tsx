import { cn } from '@/lib/utils';
import React, { DetailedHTMLProps, HTMLAttributes } from 'react';
import { WhiteBlock } from './white-block';
import { Input, Textarea } from '../ui';

interface ICheckoutDeliveryAddressBlockProps extends DetailedHTMLProps< HTMLAttributes<HTMLDivElement>, HTMLDivElement > {}

export const CheckoutDeliveryAddressBlock: React.FC<ICheckoutDeliveryAddressBlockProps> = ({ className }) => {
  return (
    <WhiteBlock title='3. Адрес доставки' className={cn('', className)}>
        <div className="flex flex-col gap-5">
            <Input name='adress' className='text-base' placeholder='Введите свой адрес' />
            <Textarea
                className='text-base'
                placeholder='Комментарий к заказу'
                rows={5}
            />
        </div>
    </WhiteBlock>
  );
}

