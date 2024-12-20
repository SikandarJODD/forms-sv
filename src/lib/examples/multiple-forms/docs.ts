import type { DocsType } from '../all-merge/type';
import MultipleForm from './MultipleForm.svelte?raw';

let schemaCode = `import { z } from "zod";

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
});`;

let pageServerCode = `import { fail, message, superValidate } from 'sveltekit-superforms';
import type { PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { loginSchema, registerSchema } from '$lib/examples/multiple-forms/schema';
import type { Actions } from '@sveltejs/kit';

export const load = (async () => {
    // Different Schema, No ID Required.
    return {
        registerForm: await superValidate(zod(registerSchema)),
        loginForm: await superValidate(zod(loginSchema)),

    };
}) satisfies PageServerLoad;

export const actions: Actions = {
    register: async ({ request }) => {
        let registerForm = await superValidate(request, zod(registerSchema));

        if (!registerForm.valid) {
            return fail(400, { registerForm });
        }

        // TODO : Register User and other Operations 
        return message(registerForm, 'Register Form Submitted')
    },
    login: async ({ request }) => {
        let loginForm = await superValidate(request, zod(loginSchema));

        if (!loginForm.valid) {
            return fail(400, { loginForm });
        }

        // TODO : Login User and other Operations 
        return message(loginForm, 'Login Form Submitted')
    }
};`
let pageSvelteCode = MultipleForm
export let multiple_forms: DocsType = {
    id: 'multiple-forms',
    allcode: [
        {
            code: schemaCode,
            name: 'schema.ts'
        },
        {
            code: pageSvelteCode,
            name: '+page.svelte'
        },
        {
            code: pageServerCode,
            name: '+page.server.ts'
        },
    ]
}