import { z } from 'zod';

const registerSchema = z.object({
  name: z
    .string({
      invalid_type_error: 'Name must be a string',
    })
    .min(1)
    .max(255),
  email: z.string().email({
    message: 'Email must be a valid email',
  }),
  password: z
    .string({
      invalid_type_error: 'Password must be a string',
    })
    .min(6)
    .max(255),
  confirm_password: z
    .string({
      invalid_type_error: 'Confirm Password must be a string',
    })
    .min(6)
    .max(255),
  avatar_url: z.string().optional(),
  phone_number: z.string({
    invalid_type_error: 'Phone Number must be a string',
  }),
});

const loginSchema = z.object({
  email: z.string().email({
    message: 'Email must be a valid email',
  }),
  password: z
    .string({
      invalid_type_error: 'Password must be a string',
    })
    .min(6)
    .max(255),
});

export { registerSchema, loginSchema };