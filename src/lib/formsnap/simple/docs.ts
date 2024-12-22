import type { DocsType } from "$lib/examples/all-merge/type";
import SnapSimpleForms from "./SnapSimpleForms.svelte?raw";

let schemacode = `import { z } from "zod";

export let userSchema = z.object({
    name: z.string(),
    username: z.string().min(4),
    email: z.string().email("Please enter a valid email"),
})`;
let pageSvelteCode = SnapSimpleForms;
let pageServerCode = `import type { PageServerLoad } from "./$types";

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
};`;

export let snap_simpleform: DocsType = {
    id: "simple",
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