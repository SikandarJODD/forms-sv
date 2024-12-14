import { registerSchema } from '$lib/examples/zod-validation/schema';
import type { Actions } from '@sveltejs/kit';
import { z } from 'zod';


export const actions: Actions = {
    default: async ({ request }) => {
        let formData = Object.fromEntries(await request.formData());
        try {
            let result = registerSchema.parse(formData);
        } catch (e) {
            let { fieldErrors: errors } = e.flatten();
            let { password, confirm_password, ...rest } = formData;
            return {
                data: rest,
                errors
            };
        }
    }
};
