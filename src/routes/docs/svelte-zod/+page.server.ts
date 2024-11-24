import type { Actions } from '@sveltejs/kit';
import { z } from 'zod';

let registerSchema = z
    .object({
        name: z
            .string({
                required_error: 'Name is required'
            })
            .min(3, {
                message: 'Name must be at least 3 characters long'
            })
            .max(64, {
                message: 'Name must be at most 64 characters long'
            })
            .trim(),
        email: z
            .string({
                required_error: 'Email is required'
            })
            .email({
                message: 'Invalid email address'
            }),
        password: z
            .string({
                required_error: 'Password is required'
            })
            .min(6, {
                message: 'Password must be at least 6 characters long'
            })
            .max(32, {
                message: 'Password must be at most 32 characters long'
            })
            .trim(),
        confirm_password: z
            .string({
                required_error: 'Confirm password is required'
            })
            .min(6, {
                message: 'Confirm password must be at least 6 characters long'
            })
            .max(32)
            .trim(),
        terms: z.enum(['on'], {
            message: 'You must agree to the terms and conditions'
        })
    })
    .superRefine(({ password, confirm_password }, ctx) => {
        if (password !== confirm_password) {
            // ctx.addIssue({
            // 	code: 'custom',
            // 	message: 'Password and Confirm Password must match',
            // 	path: ['password']
            // });
            ctx.addIssue({
                code: 'custom',
                message: 'Password and Confirm Password must match',
                path: ['confirm_password']
            });
        }
    });
export const actions: Actions = {
    default: async ({ request }) => {
        let formData = Object.fromEntries(await request.formData());
        try {
            let result = registerSchema.parse(formData);
            console.log(result);
        } catch (e) {
            console.log(e.flatten());
            let { fieldErrors: errors } = e.flatten();
            let { password, confirm_password, ...rest } = formData;
            return {
                data: rest,
                errors
            };
        }
    }
};
