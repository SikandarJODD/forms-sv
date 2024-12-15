
import { fail, message, superForm, superValidate, withFiles } from "sveltekit-superforms";
import type { PageServerLoad } from "./$types";
import { zod } from "sveltekit-superforms/adapters";
import type { Actions } from "@sveltejs/kit";
import { image_schema } from '$lib/formsnap/image-validation/schema';

export const load: PageServerLoad = async () => {
    return { form: await superValidate(zod(image_schema)) }
};

export const actions: Actions = {
    default: async ({ request }) => {
        let form = await superValidate(request, zod(image_schema));
        console.dir(form, { depth: Infinity });
        if (!form.valid) {
            return fail(400, withFiles({ form }));
        }
        return message(form, "You have Uploaded a Valid File!");
    }
}