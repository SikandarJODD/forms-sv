import { z } from 'zod';

export let schema = z.object({
    name: z.string().min(3),
    email: z.string().email(),
})