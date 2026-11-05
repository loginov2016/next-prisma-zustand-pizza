import { axiosInstance } from "./instance"
import { ApiRoutes } from "./api-routes";
import { Order } from "@prisma/client";

export const getOrder = async (): Promise<Order> => {
    const { data } = await axiosInstance.get<Order>(ApiRoutes.CHECKOUT_SUCCESS);
    return data;
}

