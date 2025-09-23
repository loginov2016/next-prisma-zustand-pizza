import {  z } from "zod";

export const checkoutFormSchema = z.object({
    firstName: z.string().min(3, { message: "Имя должно содержать не менее 3 символов" }),
    lastName: z.string().min(3,  { message: "Фамилия должна содержать не менее 3 символов" }),
    email: z.string().email({ message: "Введите корректный email" }),  
    phone: z.string().min(10, { message: "Введите корректный номер телефона" }),    
    address: z.string().min(5, { message: "Введите корректный адрес, не меньше 5 символов" }),    
    comment: z.string().min(5, { message: "Введите корректный комментарий, не меньше 5 символов" }),  
});

export type TCheckoutFormSchema = z.infer<typeof checkoutFormSchema>;
