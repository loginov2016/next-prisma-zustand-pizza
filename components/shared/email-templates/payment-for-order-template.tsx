import React from 'react';

export interface IPaymentForOrderProps {
  orderId: number;
  totalAmount: number;
  paymentUrl: string;
}

export function PaymentForOrderTemplate({ orderId, totalAmount, paymentUrl }: IPaymentForOrderProps) {
  return (
    <div>
        <h1>Заказ, #{orderId}</h1>
        <p> 
            Оплатите заказ на сумму <b>{totalAmount}</b> ₽. Перейдите <a href={paymentUrl}>по этой ссылке</a> для оплаты заказа
        </p>
    </div>
  );
}