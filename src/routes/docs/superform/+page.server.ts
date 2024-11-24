import type { Actions } from '@sveltejs/kit';
import type { PageServerLoad } from '../../$types';

import { fail, message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters'
import { schema } from '$lib/examples/superforms/schema';

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
