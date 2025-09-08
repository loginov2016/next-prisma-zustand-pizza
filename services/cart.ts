import { axiosInstance } from "./instance";
import { ICartDTO, ICreateCartProductVariationValues } from "./dto/cart.dto";

export const getCart = async (): Promise<ICartDTO> => {
    const { data } = await axiosInstance.get<ICartDTO>('/cart');
    //console.log('getCart', data);
    return data;
}

export const updateItemQuantity = async (itemId: number, quantity: number): Promise<ICartDTO> => {
    const { data } = await axiosInstance.patch<ICartDTO>('/cart/' + itemId, { quantity });
    return data;
}

export const addCartItem = async (values: ICreateCartProductVariationValues): Promise<ICartDTO> => {
    const { data } = await axiosInstance.post<ICartDTO>('/cart', values);
    return data;
}

export const removeCartItem = async (itemId: number): Promise<ICartDTO> => {
    const { data } = await axiosInstance.delete<ICartDTO>('/cart/' + itemId);
    return data;
}

