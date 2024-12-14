import { z } from "zod";

export let userSchema = z.object({
    name: z.string(),
    username: z.string().min(4),
    email: z.string().email("Please enter a valid email"),
})