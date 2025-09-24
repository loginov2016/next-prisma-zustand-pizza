import { TCartItemDTO } from '@/services/dto/cart.dto';
import React from 'react';

export interface ISuccessPaymentForOrderProps {
  orderId: number;
  totalAmount: number;
  cartItems: TCartItemDTO[];
}

export function SuccessPaymentForOrder({ orderId, totalAmount, cartItems }: ISuccessPaymentForOrderProps) {
  return (
    <div>
        <h1>Спасибо, за покупку!</h1>

        <p> Ваш заказ #{orderId} оплачен на сумму <b>{totalAmount}</b> ₽. Список товаров:</p>

        <hr/>

        <ul>
            {
              cartItems.map(
                (cartItem) => (
                  <li key={cartItem.id}>
                    {cartItem.productVariation.product.name} | {cartItem.productVariation.price} ₽ x {cartItem.quantity} шт. ={' '} {cartItem.quantity * cartItem.productVariation.price}  
                  </li>
                )
              )
            }
        </ul>
    </div>
  );
}