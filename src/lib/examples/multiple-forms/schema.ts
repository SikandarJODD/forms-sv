import { z } from "zod";

export let loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6)
})

export let registerSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    confirmPassword: z.string().min(6)
}).superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
        ctx.addIssue({
            code: 'custom',
            path: ['confirmPassword'],
            message: 'Password and Confirm Password must match',
        });
    }
});