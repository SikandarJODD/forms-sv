import { z } from "zod";

export let userSchema = z.object({
    id: z.string().regex(/^\d+$/),
    name: z.string().min(3),
    email: z.string().email()
})

type UserDB = z.infer<typeof userSchema>[];

let g = globalThis as unknown as { users: UserDB };

export let userId = () => String(Math.random()).slice(2);

export let users: UserDB = (g.users = g.users || [
    {
        id: userId(),
        name: 'Sikandar Bhide',
        email: 'sikandar@example.com'
    },
    {
        id: userId(),
        name: 'Aditya',
        email: 'aditya@example.com'
    }
])