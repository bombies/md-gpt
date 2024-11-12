import {authenticated} from "@/app/api/utils";
import userService from "@/app/api/users/service";
import {NextResponse} from "next/server";

type Context = {
    params: {
        id: string,
        patientId: string
    }
}

export async function GET(_: Request, {params}: Context) {
    return authenticated(async () => {
        const patient = await userService.fetchPatient(params.patientId)
        return patient.error ?? NextResponse.json(patient.success!)
    })
}