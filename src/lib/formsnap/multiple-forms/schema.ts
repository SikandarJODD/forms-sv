import { z } from "zod";

export let loginFormSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6).max(255)
})

export let registerFormSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6).max(255),
    confirm_password: z.string().min(6).max(255)
}).refine((data) => data.password === data.confirm_password, {
    message: "Password dosen't match.",
    path: ['confirm_password']
})