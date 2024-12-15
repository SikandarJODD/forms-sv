import { z } from "zod";

export let debounce_username_schema = z.object({
    email: z.string().email(),
    username: z.string().min(5, {
        message: "Must be at least 5 characters"
    }).regex(/^[a-z]+$/, 'Only lowercase letters are allowed'),
})