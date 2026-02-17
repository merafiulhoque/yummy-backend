import z from "zod";

export const adminSchema = z.object({
    name: z.string().min(3, "Name too small"),
    email: z.string().email("Email invalid"),
    password: z.string().min(6, "Password length must be atleast 6 characters")
})