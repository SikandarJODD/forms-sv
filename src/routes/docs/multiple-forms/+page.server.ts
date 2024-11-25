import { fail, message, superValidate } from 'sveltekit-superforms';
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
};