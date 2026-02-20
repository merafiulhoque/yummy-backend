import z, { email } from "zod";

export const adminSchema = z.object({
    name: z.string().min(3, "Name too small"),
    email: z.string().email("Email invalid"),
    password: z.string().min(6, "Password length must be atleast 6 characters")
})

export const loginFormSchema = z.object({
    email: z.string().email("Email is invalid"),
    password: z.string().min(6, "Password must be at least 6 character")
})

export const menuAddSchema = z.object({
    item_name: z.string(),
    item_description: z.string().optional(),
    price: z.number()
})

export const staffSchema = z.object({
    name: z.string().min(3, "Name too small"),
    email: z.string().email("Email invalid"),
    password: z.string().min(6, "Password length must be atleast 6 characters")
})