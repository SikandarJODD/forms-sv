import { z } from 'zod';

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
        message: `The image is too large. Please choose an image smaller than ${formatBytes(MAX_FILE_SIZE)}.`,
    }),
    images: z.instanceof(File, {
        message: 'Please upload a valid image'
    }).refine((file) => file.size < 700_000,
        'File size should be less than 440kb').array().min(1, {
            message: 'Please upload at least one image'
        }),
})