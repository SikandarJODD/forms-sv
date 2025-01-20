import { z } from 'zod';

// Step 1
export let schemaStep1 = z.object({
  name: z.string().min(3),
  email: z.string().email()
})

// Step 2
export let schemaStep2 = schemaStep1.extend({
  org_name: z.string().min(3),
})

// Step 3
export let schemaStep3 = schemaStep2.extend({
  social_github: z.string().url().optional(),
  social_twitter: z.string().url(),
})
