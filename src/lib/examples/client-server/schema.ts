import { z } from "zod";

export let schema = z.object({
    name: z.string().min(3).max(255),
    email: z.string().email(),
    age: z.string().regex(/^\d+$/),
})