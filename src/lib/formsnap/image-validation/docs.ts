import type { DocsType } from "$lib/examples/all-merge/type";
import SnapImageValidation from "./SnapImageValidation.svelte?raw";

let schemacode = `import { z } from 'zod';

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

const formatBytes = (bytes: number, decimals = 2) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
};

export let image_schema = z.object({
    email: z.string().email(),
    image: z.instanceof(File, {
        message: 'Please upload a valid image'
    }).refine((file) => file.size < MAX_FILE_SIZE, {
        message: \`The image is too large. Please choose an image smaller than \${formatBytes(MAX_FILE_SIZE)}.\`,
    }),
    images: z.instanceof(File, {
        message: 'Please upload a valid image'
    }).refine((file) => file.size < 700_000,
        'File size should be less than 440kb').array().min(1, {
            message: 'Please upload at least one image'
        }),
})`;
let pageSvelteCode = SnapImageValidation;
let pageServerCode = `
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
}`;

export let snap_imagevalidations: DocsType = {
    id: "image-validation",
    allcode: [
        {
            name: "schema.ts",
            code: schemacode,
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