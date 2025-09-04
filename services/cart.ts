import { axiosInstance } from "./instance";
import { ICartDTO } from "./dto/cart.dto";

export const getCart = async (): Promise<ICartDTO> => {
    const { data } = await axiosInstance.get<ICartDTO>('/cart');
    //console.log('getCart', data);
    return data;
}

export const updateItemQuantity = async (itemId: number, quantity: number): Promise<ICartDTO> => {
    const { data } = await axiosInstance.patch<ICartDTO>('/cart/' + itemId, { quantity });
    return data;
}