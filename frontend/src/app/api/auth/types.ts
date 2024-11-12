import {z} from "zod";

export type RegisterUserDto = {
    username: string,
    email: string,
    firstName: string,
    lastName: string,
    password: string
}

export const registerUserDtoSchema = z.object({
    username: z.string(),
    email: z.string().email(),
    firstName: z.string().min(3).max(30),
    lastName: z.string().min(2).max(50),
    password: z.string()
})

export type LoginUserDto = {
    username?: string,
    email?: string,
    password: string
}

export const loginUserDtoSchema = z.object({
    username: z.string().optional(),
    email: z.string().email().optional(),
    password: z.string()
})