import {authenticated} from "@/app/api/utils";
import userService from "@/app/api/users/service";
import { NextResponse } from "next/server";
import {AddPatientDto} from "@/app/api/users/types";

type Context = {
    params: Promise<{
        id: string
    }>
}

export async function GET(_: Request, props: Context) {
    const params = await props.params;
    return authenticated(async () => {
        return NextResponse.json(await userService.fetchPatients(params.id));
    })
}

export async function POST(req: Request, props: Context) {
    const params = await props.params;
    return authenticated(async () => {
        const body: AddPatientDto = await req.json()
        const createdPatient = await userService.createPatient(params.id, body)
        return createdPatient.error ?? NextResponse.json(createdPatient.success!)
    })
}