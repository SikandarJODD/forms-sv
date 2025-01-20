
import type { DocsType } from '../all-merge/type';
import SvelteSuperForm from './SvelteSuperForm.svelte?raw';

let pageSvelteCode = SvelteSuperForm;
let pageServerCode = `import type { Actions } from '@sveltejs/kit';

import { fail, message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters'
import { schema } from '$lib/examples/superforms/schema';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
    let form = await superValidate(zod(schema));
    return { form }
};


export const actions: Actions = {
    default: async ({ request }) => {
        let form = await superValidate(request, zod(schema));

        if (!form.valid) {
            return fail(400, { form });
        }
        return message(form, 'You have Uploaded a Valid File!')
    }
};
`;
let schemaCode = `import { z } from 'zod';

export let schema = z.object({
    name: z.string().min(3),
    email: z.string().email(),
})`;

export let superforms_docs: DocsType = {
    id: 'superform',
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
