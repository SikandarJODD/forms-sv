import { z } from "zod";

export let schema = z.object({
    email: z.string().email(),
    username: z.string().min(3, {
        message: "Must be at least 3 characters"
    }).regex(/^[a-z]+$/, 'Only lowercase letters are allowed'),
})