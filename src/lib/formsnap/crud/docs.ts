import type { DocsType } from "$lib/examples/all-merge/type";
import SnapCrudForm from "./SnapCrudForm.svelte?raw";


let schemacode = `import { z } from "zod";

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
let pageSvelteCode = SnapCrudForm;
let pageServerCode = `import { superValidate, message } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { error, fail, redirect } from '@sveltejs/kit';

import { users, userId, userSchema } from '$lib/examples/crud/user';
import type { PageServerLoad, Actions } from './$types';

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
            return fail(400, { form, message: 'Failed to Submit' });
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
                throw redirect(303, '/formsnap/crud/users');
            }
            else {
                // Upate User
                users[index] = { ...form.data, id: form.data.id };
                return message(form, 'User Updated Successfully!');
            }
        }
    }
};`;

export let snap_crud: DocsType = {
    id: "users", // as url : /formsnap/crud/users <- id 
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