import type { DocsType } from '../all-merge/type';
import MultiStepClient from './MultiStepClient.svelte?raw';
let schemaCode = `import { z } from 'zod';

// Step 1
export let schemaStep1 = z.object({
  name: z.string().min(3),
  email: z.string().email()
})

// Step 2
export let schemaStep2 = schemaStep1.extend({
  org_name: z.string().min(3),
})

// Step 3
export let schemaStep3 = schemaStep2.extend({
  social_github: z.string().url().optional(),
  social_twitter: z.string().url(),
})
`;

let pageSvelteCode = MultiStepClient;
let pageServerCode = `import { zod } from 'sveltekit-superforms/adapters';
import { fail, message, superValidate } from 'sveltekit-superforms';
import type { PageServerLoad } from './$types';
import { schemaStep3 as lastStep } from '$lib/examples/multi-step-client/schema';
import type { Actions } from '@sveltejs/kit';

export const load = (async () => {
  let form = await superValidate(zod(lastStep));
  return { form }
}) satisfies PageServerLoad;

export const actions: Actions = {
  default: async ({ request }) => {
    let form = await superValidate(request, zod(lastStep));
    console.log(form);
    if (!form.valid) {
      return fail(400, { form });
    }

    return message(form, 'Form Posted Successfully!');
  }
};`;



export let multi_step_client: DocsType = {
    id: 'multi-step-client',
    allcode: [
        {
            name: "schema.ts",
            code: schemaCode,
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
    ],
    credits: {
        name: 'Superforms',
    }
}