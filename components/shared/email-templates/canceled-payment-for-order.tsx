export interface ICanceledPaymentForOrderProps {
  orderId: number;
  totalAmount: number;
}

export function CanceledPaymentForOrder({ orderId, totalAmount }: ICanceledPaymentForOrderProps) {
  return (
    <div>
        <h1>Заказ #{orderId} отменен!</h1>
        <p> 
            Ваш заказ №{orderId} на сумму <b>{totalAmount}</b> ₽ был успешно отменен. 
        </p>
        <p>
            Если у вас возникли вопросы или отмена произошла по ошибке, пожалуйста, свяжитесь с нашей службой поддержки.
        </p>
    </div>
  );
}