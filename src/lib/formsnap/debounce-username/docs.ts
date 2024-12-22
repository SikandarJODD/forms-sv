import type { DocsType } from "$lib/examples/all-merge/type";
import SnapDebounceUsername from "./SnapDebounceUsername.svelte?raw";

let takenUsernamesCode = `export const takenUsernames = [
    'Alpha',
    'Bravo',
    'Charlie',
    'Delta',
    'Echo',
    'India',
].map((n) => n.toLowerCase());`;
let schemacode = `import { z } from "zod";

export let debounce_username_schema = z.object({
    email: z.string().email(),
    username: z.string().min(5, {
        message: "Must be at least 5 characters"
    }).regex(/^[a-z]+$/, 'Only lowercase letters are allowed'),
})`;
let pageSvelteCode = SnapDebounceUsername;
let pageServerCode = `import { fail, message, setError, superValidate, type Infer, type SuperValidated } from 'sveltekit-superforms';
import type { PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import type { Actions } from '@sveltejs/kit';
import { takenUsernames } from '$lib/examples/debounce-username/usernames';
import { debounce_username_schema } from '$lib/formsnap/debounce-username/schema';


let usernameSchema = debounce_username_schema.pick({ username: true });

export const load: PageServerLoad = async () => {
    return {
        form: await superValidate(zod(debounce_username_schema))
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
        let form = await superValidate(request, zod(debounce_username_schema));
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

export let snap_debounce_username: DocsType = {
    id: "debounce-username",
    allcode: [
        {
            name: "schema.ts",
            code: schemacode,
            lang: 'ts'
        },
        {
            name: "usernames.ts",
            code: takenUsernamesCode,
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