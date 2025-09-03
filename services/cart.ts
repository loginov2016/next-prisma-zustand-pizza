import { axiosInstance } from "./instance";
import { ICartDTO } from "./dto/cart.dto";

export const fetchCart = async (): Promise<ICartDTO> => {
    const { data } = await axiosInstance.get<ICartDTO>('/cart');
    //console.log('fetchCart', data);
    return data;
}