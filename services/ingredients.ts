import { axiosInstance } from "./instance"
import { ApiRoutes } from "./api-routes";
import { Ingredient } from "@prisma/client";

export const getAll = async (): Promise<Ingredient[]> => {
    //console.log('Сработала ф-ия getAll');
    const { data } = await axiosInstance.get<Ingredient[]>(ApiRoutes.INGREDIENTS);
    return data;
}