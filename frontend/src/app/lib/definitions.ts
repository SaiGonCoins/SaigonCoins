import { z } from 'zod'

export const SignupFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters long.' })
    .trim(),
  email: z
    .string()
    .email({ message: 'Please enter a valid email.' })
    .trim(),
  phone: z
    .string()
    .regex(/^\d{10,11}$/, { message: 'Phone number must be 10-11 digits.' })
    .trim(),
  password: z
    .string()
    .min(8, { message: 'Be at least 8 characters long' })
    .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
    .regex(/[0-9]/, { message: 'Contain at least one number.' })
    .regex(/[^a-zA-Z0-9]/, {
      message: 'Contain at least one special character.',
    })
    .trim(),
})

export const LoginFormSchema = z.object({
  email: z.string().email({ message: 'Email không hợp lệ' }).trim(),
  password: z.string().min(1, { message: 'Vui lòng nhập mật khẩu' }),
});

export type FormState =
  | {
    errors?: {
      name?: string[]
      email?: string[]
      phone?: string[]
      password?: string[]
    }
    message?: string
  }
  | undefined
