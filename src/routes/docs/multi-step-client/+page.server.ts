import { zod } from 'sveltekit-superforms/adapters';
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
};