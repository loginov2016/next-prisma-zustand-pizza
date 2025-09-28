import { z } from "zod";

export const passwordSchema = z.string().min(6, { message: "Введите корректный пароль" });

export const loginFormSchema = z.object({
    email: z.string().email({ message: "Введите корректную почту" }),
    password: passwordSchema,
})
//.min(6, { message: "Пароли должны быть одинаковыми" }),
export const registerFormSchema = loginFormSchema.merge(
    z.object({
        fullName: z.string().min(5, { message: "Введите имя и фамилию, содержащие не менее 5 символов" }),
        confirmPassword: passwordSchema 
    })
).refine(data => data.password === data.confirmPassword, {
        message: "Пароли не солвпадают",
        path: ["confirmPassword"],    
    }
);

export type TLoginFormSchema = z.infer<typeof loginFormSchema>;
export type TRegisterFormSchema = z.infer<typeof registerFormSchema>;