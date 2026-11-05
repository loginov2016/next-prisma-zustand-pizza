import { TCartItemDTO } from '@/services/dto/cart.dto';
import React from 'react';

export interface ISuccessPaymentForOrderProps {
  orderId: number;
  totalAmount: number;
  cartItems: TCartItemDTO[];
}

export function SuccessPaymentForOrder({ orderId, totalAmount, cartItems }: ISuccessPaymentForOrderProps) {
  //cartItems.map( (cartItem) => console.log(cartItem.ingredients.map( (ingredient) => console.log(ingredient.price) )) );
  console.log( cartItems.map( (cartItem) => (`${cartItem.productVariation.product.name} | ${cartItem.productVariation.price} ₽ x ${cartItem.quantity} шт. = ${cartItem.quantity * cartItem.productVariation.price}`) ));
  console.log(`Итоговая сумма #${orderId} заказа: `, cartItems.reduce( (acc, cartItem) => acc + cartItem.quantity * cartItem.productVariation.price, 0 ));

  const getProducts = (data: TCartItemDTO[]) => {
    return data.map( (cartItem) => {
      if(cartItem.productVariation.pizzaType) {
        return (
          <li key={cartItem.id}>
            {cartItem.productVariation.product.name} | {cartItem.productVariation.price} ₽  и выбранные ингредиенты для этой пиццы:
            {cartItem?.ingredients.length > 0 && (
              <>
                <ul>
                  {
                    cartItem.ingredients.map(
                      (ingredient) => (
                        <li key={ingredient.id}>
                          {ingredient.name} | {ingredient.price} ₽ 
                        </li>
                      )
                    )
                  }
                  <hr style={{width: '30%', marginLeft: '0', marginTop: '10px'}}/>
                  <span>Итоговая сумма ингредиентов для пиццы {cartItem.productVariation.product.name}: {cartItem.ingredients.reduce( (acc, ingredient) => acc + ingredient.price, 0 )}</span>  
                </ul>
                <h4>
                  {cartItem.productVariation.product.name} c выбранными ингредиентами | {' '}
                  {(cartItem.productVariation.price + cartItem.ingredients.reduce( (acc, ingredient) => acc + ingredient.price, 0 )) } x {cartItem.quantity} шт. = {' '}  {(cartItem.productVariation.price + cartItem.ingredients.reduce( (acc, ingredient) => acc + ingredient.price, 0 )) * cartItem.quantity } 
                </h4>
              </>
            )}
          </li>
        )
      } else {
        return (
          <li key={cartItem.id}>
            {cartItem.productVariation.product.name} | {cartItem.productVariation.price} ₽ x {cartItem.quantity} шт. ={' '} {cartItem.quantity * cartItem.productVariation.price}  
          </li>
        )
      }
    } )
  } 

  const getTotalAmount = (data: TCartItemDTO[]) => {
    return data.reduce( (acc, cartItem) => acc + (cartItem.productVariation.price + cartItem?.ingredients.reduce( (acc, ingredient) => acc + ingredient?.price, 0 )) * cartItem.quantity, 0 )
  }
  
  return (
    <div>
        <h1>Спасибо, за покупку!</h1>
        <p> Ваш заказ <b>#{orderId}</b> оплачен на сумму <b>{totalAmount}</b> ₽. Список товаров:</p>
        <hr/>
        <ul>
            {getProducts(cartItems)}
        </ul>
        <hr style={{ margin: '0'}}/>
        <h3>Общая сумма заказа <b>#{orderId}</b>: {getTotalAmount(cartItems)} {' '} ₽</h3>
    </div>
  );
}


/* 
x {cartItem.quantity} шт. ={' '} {cartItem.quantity * cartItem.productVariation.price}
(ingredients: TCartItemDTO['ingredients'], pizzaType: TCartItemDTO['pizzaType'], pizzaSize: TCartItemDTO['pizzaSize']) => {
    return `${pizzaType} | ${pizzaSize} | ${ingredients.map( (ingredient) => `${ingredient.name} | ${ingredient.price} ₽ ` )}`;
*/

/* 

cartItems.map(
    (cartItem) => (
      <li key={cartItem.id}>
        {cartItem.productVariation.product.name} | {cartItem.productVariation.price} ₽  и выбранные ингредиенты для этой пиццы:
        {cartItem?.ingredients.length > 0 && (
          <>
            <ul>
              {
                cartItem.ingredients.map(
                  (ingredient) => (
                    <li key={ingredient.id}>
                      {ingredient.name} | {ingredient.price} ₽ 
                    </li>
                  )
                )
              }
              <hr style={{width: '15%', marginLeft: '0', marginTop: '10px'}}/>
              <span>Итоговая сумма ингредиентов для пиццы {cartItem.productVariation.product.name}: {cartItem.ingredients.reduce( (acc, ingredient) => acc + ingredient.price, 0 )}</span>  
            </ul>
            <h4>
              {cartItem.productVariation.product.name} c выбранными ингредиентами | {' '}
              {(cartItem.productVariation.price + cartItem.ingredients.reduce( (acc, ingredient) => acc + ingredient.price, 0 )) } x {cartItem.quantity} шт. = {' '}  {(cartItem.productVariation.price + cartItem.ingredients.reduce( (acc, ingredient) => acc + ingredient.price, 0 )) * cartItem.quantity } 
            </h4>
          </>
        )}
      </li>
    )
  )
*/

/* 
  <h3>Итоговая сумма заказа: {cartItems.reduce( 
    (acc, cartItem) => acc + (cartItem.productVariation.price + cartItem?.ingredients.reduce( (acc, ingredient) => acc + ingredient?.price, 0 )) * cartItem.quantity, 0 )}₽
  </h3>
*/