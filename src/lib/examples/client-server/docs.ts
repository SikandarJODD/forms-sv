import type { DocsType } from '../all-merge/type';
import ClientServerForm from './ClientServerForm.svelte?raw';


let pageSvelteCode = ClientServerForm;
let pageServerCode = `import type { Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

import { fail, message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

import { schema } from '$lib/examples/client-server/schema';

export const load: PageServerLoad = async ({ request }) => {
    return { form: await superValidate(zod(schema)) }
};

export const actions: Actions = {
    default: async ({ request }) => {
        let form = await superValidate(request, zod(schema));
        if (!form.valid) {
            return fail(400, { form });
        }
        return message(form, 'Form Posted Successfully!');
    }
};`;
let schemaCode = `import { z } from "zod";

export let schema = z.object({
    name: z.string().min(3).max(255),
    email: z.string().email(),
    age: z.string().regex(/^\d+$/),
})`;

export let client_server_docs: DocsType = {
    id: 'client-server',
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