import { z } from 'zod';

export let schema = z.object({
    name: z.string().min(3),
    email: z.string().email(),
    image: z.instanceof(File, {
        message: 'Please upload a valid image'
    }).refine((file) => file.size < 900_000,
        'File size should be less than 400kb'),
    images: z.instanceof(File, {
        message: 'Please upload a valid image'
    }).refine((file) => file.size < 600_000,
        'File size should be less than 400kb').array().min(1,{
            message: 'Please upload at least one image'
        }),
})