// Docs will contain all code and id for Table of Contents 
// All Docs will merge with one file in superforms, formsnap 
import ZodValidationCode from '$lib/examples/zod-validation/ZodValidation.svelte?raw';
import type { DocsType } from '../all-merge/type';
let schemaCode = `import { z } from 'zod';

export let registerSchema = z
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
    });`;

let pageSvelteCode = ZodValidationCode;
let pageServerCode = `import { registerSchema } from '$lib/examples/zod-validation/schema';
import type { Actions } from '@sveltejs/kit';
import { z } from 'zod';

export const actions: Actions = {
    default: async ({ request }) => {
        let formData = Object.fromEntries(await request.formData());
        try {
            let result = registerSchema.parse(formData);
        } catch (e) {
            let { fieldErrors: errors } = e.flatten();
            let { password, confirm_password, ...rest } = formData;
            return {
                data: rest,
                errors
            };
        }
    }
};`;

/*
Schema for Docs & Snap Page 
- unique id - same for table of content 

 * all below 3 with optional desc 
- page svelte code 
- schema code
- page server code 

* Credits table with name, url, github, twitter, desc
*/

export let svelteZod: DocsType = {
    id: 'svelte-zod',
    allcode: [
        {
            name: "schema.ts",
            code: schemaCode,
            lang: 'ts'
        },
        {
            name: "+page.svelte",
            code: pageSvelteCode,
        },
        {
            name: "+page.server.ts",
            code: pageServerCode,
            lang: 'ts'
        },
    ],
    credits: {
        name: 'Superforms',
    }
}