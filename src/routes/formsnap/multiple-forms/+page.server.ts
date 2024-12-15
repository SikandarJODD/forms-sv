import { fail, message, superValidate } from 'sveltekit-superforms';
import type { PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { loginFormSchema, registerFormSchema } from '$lib/formsnap/multiple-forms/schema';
import type { Actions } from '@sveltejs/kit';

export const load = (async () => {
    // Register Form and Login Form 
    let registerForm = await superValidate(zod(registerFormSchema));
    let loginForm = await superValidate(zod(loginFormSchema));

    return { registerForm, loginForm };

}) satisfies PageServerLoad;



export const actions: Actions = {
    register: async ({ request }) => {
        let registerForm = await superValidate(request, zod(registerFormSchema));

        if (!registerForm.valid) {
            return fail(400, { registerForm });
        }

        // Todo
        return message(registerForm, 'Form Posted Successfully');
    },
    login: async ({ request }) => {
        let loginForm = await superValidate(request, zod(loginFormSchema));

        if (!loginForm.valid) {
            return fail(400, { loginForm })
        }

        // Todo
        return message(loginForm, 'Form Posted Successfully');
    }
};