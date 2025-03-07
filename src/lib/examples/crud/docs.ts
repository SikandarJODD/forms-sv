import type { DocsType } from '../all-merge/type';
import CrudForm from './CrudForm.svelte?raw';

let pageSvelteCode = CrudForm;
let pageServerCode = `import { superValidate, message } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { error, fail, redirect } from '@sveltejs/kit';

import { users, userId, userSchema } from '$lib/examples/crud/user';
import type { PageServerLoad, Action, Actions } from './$types';

// crudSchema makes id optional while validaion 
let crudSchema = userSchema.extend({
    id: userSchema.shape.id.optional()
})

export const load: PageServerLoad = async ({ params }) => {
    let user = users.find((n) => n.id === params.id)

    // if /users/random-id which is not present in users array 
    if (params.id && !user) {
        throw error(404, 'User not Found');
    }

    let form = await superValidate(user, zod(crudSchema));
    return {
        form, users
    }
};


export const actions: Actions = {
    default: async ({ request }) => {
        let formData = await request.formData();
        let form = await superValidate(formData, zod(crudSchema));

        if (!form.valid) {
            return fail(400, { form });
        }
        if (!form.data.id) {
            // Create New User 
            let user = { ...form.data, id: userId() }
            users.push(user);
            return message(form, 'User Created Successfully!');
        }
        else {
            let index = users.findIndex(n => n.id === form.data.id);
            if (index === -1) {
                throw error(400, 'User Not Found');
            }
            if (formData.has('delete')) {
                // Delete User
                users.splice(index, 1);
                throw redirect(303, '/docs/crud/users');
            }
            else {
                // Upate User
                users[index] = { ...form.data, id: form.data.id };
                return message(form, 'User Updated Successfully!');
            }
        }
    }
};`;
let schemaCode = `import { z } from "zod";

export let userSchema = z.object({
    id: z.string().regex(/^\d+$/),
    name: z.string().min(3),
    email: z.string().email()
})

type UserDB = z.infer<typeof userSchema>[];

let g = globalThis as unknown as { users: UserDB };

export let userId = () => String(Math.random()).slice(2);

export let users: UserDB = (g.users = g.users || [
    {
        id: userId(),
        name: 'Sikandar Bhide',
        email: 'sikandar@example.com'
    },
    {
        id: userId(),
        name: 'Aditya',
        email: 'aditya@example.com'
    }
])`;



export let crud_form: DocsType = {
    id: 'users',
    allcode: [
        {
            code: schemaCode,
            name: 'schema.ts',
            lang: 'ts'
        },
        {
            code: pageSvelteCode,
            name: '+page.svelte'
        },
        {
            code: pageServerCode,
            name: '+page.server.ts',
            lang: 'ts'
        },
    ]
}