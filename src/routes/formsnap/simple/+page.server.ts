import type { PageServerLoad } from "./$types";

import { fail, message, superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";

// Schema
import { userSchema } from "$lib/formsnap/simple/schema";
import type { Actions } from "@sveltejs/kit";

export const load: PageServerLoad = async () => {
    return { form: await superValidate(zod(userSchema)) }
};

export const actions: Actions = {
    userdetails: async ({ request }) => {
        let formData = await superValidate(request, zod(userSchema))
        if (!formData.valid) {
            fail(400, { formData });
        }

        return message(formData, 'User details saved successfully');
    }
};