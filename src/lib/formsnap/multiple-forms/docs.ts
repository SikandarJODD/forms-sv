import type { DocsType } from "$lib/examples/all-merge/type";
import SnapMultipleForms from "./SnapMultipleForms.svelte?raw";

let schemacode = `import { z } from "zod";

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
})`;
let pageSvelteCode = SnapMultipleForms;
let pageServerCode = `import { fail, message, superValidate } from 'sveltekit-superforms';
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
};`;

export let snap_multipleforms: DocsType = {
    id: "multiple-forms",
    allcode: [
        {
            name: "schema.ts",
            code: schemacode,
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
    ]
}