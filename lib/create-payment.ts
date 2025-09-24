import { IPaymentData } from "@/@types/yookassa";
import axios from "axios";

export interface ICreatePaymentProps {
    description: string;
    orderId: number;
    amount: number;
}

export async function createPayment(details: ICreatePaymentProps) {
    const { data } = await axios.post<IPaymentData>(
        'https://api.yookassa.ru/v3/payments',
        {
            amount: {
                value: details.amount,
                currency: 'RUB'
            },
            capture: true,
            description: details.description,
            metadata: {
                order_id: details.orderId,
            },
            confirmation: {
                type: 'redirect',
                return_url: process.env.YOOKASSA_CALLBACK_URL,
            },
        },
        {
            auth: {
                username: process.env.YOOKASSA_API_SHOP_ID as string,
                password: process.env.YOOKASSA_API_SECRET_KEY as string,
            },
            headers: {
                'Content-Type': 'application/json',
                'Idempotence-Key': Math.random().toString(36).substring(7),
            }
        }
    );

    return data;
}