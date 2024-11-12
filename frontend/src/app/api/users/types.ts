import {z} from "zod";
import {ConsultationMessage, Patient, PatientConsultation} from "@prisma/client";
import {Message} from "@/app/patients/[id]/components/consultations/ConsultationChat";

export type AddPatientDto = {
    firstName: string,
    lastName: string
}

export type PatientWithConsultations = Patient & {
    consultations?: PatientConsultationWithMessages[]
}

export type PatientConsultationWithMessages = PatientConsultation & {
    messages: ConsultationMessage[]
}

export type CreateConsultationDto = {
    messages: Message[]
}

export const addPatientDtoSchema = z.object({
    firstName: z.string(),
    lastName: z.string()
})