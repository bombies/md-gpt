import authService from "@/app/api/auth/service";
import {RegisterUserDto} from "@/app/api/auth/types";
import {NextResponse} from "next/server";

export async function POST(req: Request) {
    const body: RegisterUserDto = await req.json()
    const registeredUser = await authService.registerUser(body)
    return registeredUser.error ?? NextResponse.json(registeredUser.success!)
}