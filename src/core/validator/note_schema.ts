import { z } from 'zod';

const noteSchema = z.object({
  name: z
    .string({
      invalid_type_error: 'Name must be a string',
    })
    .min(1)
    .max(255),
  description: z.string().optional(),
  start_date: z.string().optional(),
  end_date: z.string().optional(),
  reminder: z.boolean().optional(),
  active: z.boolean().optional(),
  tags: z.array(z.string()).optional(),
  group: z.number().optional(),
});

export { noteSchema }