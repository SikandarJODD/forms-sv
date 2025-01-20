import { superValidate, defaultValues, message, type Infer } from 'sveltekit-superforms';
import type { PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { schemaStep1, schemaStep2, schemaStep3 } from '$lib/examples/multi-step-server/schema';
import type { Actions } from '@sveltejs/kit';

type Message = { step: number; text?: string }

const steps = [zod(schemaStep1), zod(schemaStep2), zod(schemaStep3)] as const;
const lastStep = steps[2];

export const load = (async () => {
    // create form with last step, so all default values gets populated
    let form = await superValidate<Infer<typeof schemaStep3>, Message>(lastStep);
    return { form };
}) satisfies PageServerLoad;

export const actions: Actions = {
    default: async ({ request }) => {
        let formData = await request.formData();
        let step = Number(formData.get('step')) || 1;

        let form = await superValidate(formData, steps[step - 1]);

        if (!form.valid) {
            return message(form, { step });
        }
        if (step < steps.length) {
            return message(form, { step: step + 1 });
        }

        // Form is Complete
        // Reset the form by hand, as resetForm is false on the client
        form.data = defaultValues(lastStep);
        return message(form, { step: 1, text: 'Form Posted Successfully!' });
    }
};

