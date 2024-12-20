import type { DocsType } from '../all-merge/type';
import ImageValidation from './ImageValidation.svelte?raw';

let pageSvelteCode = ImageValidation;
let pageServerCode = `import { fail, message, superForm, superValidate, withFiles } from "sveltekit-superforms";
import type { PageServerLoad } from "./$types";
import { zod } from "sveltekit-superforms/adapters";
import { schema } from "$lib/examples/image-validation/schema";
import type { Actions } from "@sveltejs/kit";

export const load: PageServerLoad = async () => {
    return { form: await superValidate(zod(schema)) }
};

export const actions: Actions = {
    default: async ({ request }) => {
        let form = await superValidate(request, zod(schema));
        console.dir(form, { depth: Infinity });
        if (!form.valid) {
            return fail(400, withFiles({form}));
        }
        return message(form, "You have Uploaded a Valid File!");
    }
}`;
let schemaCode = `import { z } from 'zod';

export let schema = z.object({
    name: z.string().min(3),
    email: z.string().email(),
    image: z.instanceof(File, {
        message: 'Please upload a valid image'
    }).refine((file) => file.size < 900_000,
        'File size should be less than 400kb'),
    images: z.instanceof(File, {
        message: 'Please upload a valid image'
    }).refine((file) => file.size < 700_000,
        {
            message: 'File size should be less than 700kb'
        }).array().min(1, {
            message: 'Please upload at least one image'
        }),
})`;

export let image_validation: DocsType = {
    id: 'image-validation',
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