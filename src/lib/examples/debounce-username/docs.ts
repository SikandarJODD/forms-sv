import type { DocsType } from '../all-merge/type';
import DebounceUsername from './DebounceUsername.svelte?raw';

let pageSvelteCode = DebounceUsername;
let pageServerCode = `import { fail, message, setError, superValidate, type Infer, type SuperValidated } from 'sveltekit-superforms';
import type { PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { schema } from '$lib/examples/debounce-username/schema';
import type { Actions } from '@sveltejs/kit';
import { takenUsernames } from '$lib/examples/debounce-username/usernames';


let usernameSchema = schema.pick({ username: true });

export const load: PageServerLoad = async () => {
    return {
        form: await superValidate(zod(schema))
    }
};

let checkUsername = (form: SuperValidated<Infer<typeof usernameSchema>>) => {
    if (takenUsernames.includes(form.data.username)) {
        setError(form, 'username', 'Username is already taken');
        return false;
    }
    return true;
}

export const actions: Actions = {
    post: async ({ request }) => {
        let form = await superValidate(request, zod(schema));
        if (!form.valid || !checkUsername(form)) {
            return fail(400, { form });
        }
        return message(form, 'Form Posted Successfully');
    },

    check: async ({ request }) => {
        // Introduce a little delay (large DB check)
        await new Promise((res) => setTimeout(res, 500 + Math.random() * 500));

        let form = await superValidate(request, zod(usernameSchema));

        if (!form.valid || !checkUsername(form)) {
            return fail(400, { form });
        }
        else {
            return { form };
        }
    }


};`;
let schemaCode = `import { z } from "zod";

export let schema = z.object({
    email: z.string().email(),
    username: z.string().min(3, {
        message: "Must be at least 3 characters"
    }).regex(/^[a-z]+$/, 'Only lowercase letters are allowed'),
})`;
let usernameCode = `export const takenUsernames = [
    'Alpha',
    'Bravo',
    'Charlie',
    'Delta',
    'Echo',
].map((n) => n.toLowerCase());`;

export let debounce_username_docs: DocsType = {
    id: 'debounce-username',
    allcode: [
        {
            code: schemaCode,
            name: 'schema.ts'
        },
        {
            code: usernameCode,
            name: 'username.ts'
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