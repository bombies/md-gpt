import {authenticated} from "@/app/api/utils";
import userService from "@/app/api/users/service";
import { NextResponse } from "next/server";

type Context = {
    params: Promise<{
        id: string,
        patientId: string
    }>
}

export async function GET(_: Request, props: Context) {
    const params = await props.params;
    return authenticated(async () => {
        const patient = await userService.fetchPatient(params.patientId)
        return patient.error ?? NextResponse.json(patient.success!)
    })
}