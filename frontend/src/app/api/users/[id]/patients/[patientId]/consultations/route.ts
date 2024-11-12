import {authenticated} from "@/app/api/utils";
import {CreateConsultationDto} from "@/app/api/users/types";
import userService from "@/app/api/users/service";
import {NextResponse} from "next/server";

type Context = {
    params: {
        id: string,
        patientId: string
    }
}

export async function GET(req: Request, {params}: Context) {
    return authenticated(async () => {
        return NextResponse.json(await userService.fetchConsultations(params.patientId))
    })
}

export async function POST(req: Request, {params}: Context) {
    return authenticated(async () => {
        const body: CreateConsultationDto = await req.json()
        const consultation = await userService.createConsultation(params.patientId, body.messages)
        return consultation.error ?? NextResponse.json(consultation.success!)
    })
}