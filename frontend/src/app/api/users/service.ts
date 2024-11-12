import prisma from "@/app/libs/prisma";
import {
    AddPatientDto,
    addPatientDtoSchema,
    PatientWithConsultations
} from "@/app/api/users/types";
import {Either, respond} from "@/app/api/utils";
import {Patient, PatientConsultation} from "@prisma/client";
import {NextResponse} from "next/server";
import {Message} from "@/app/patients/[id]/components/consultations/ConsultationChat";

class UserService {

    public async fetchPatients(userId: string) {
        return prisma.patient.findMany({
            where: {
                doctorId: userId
            }
        });
    }

    public async fetchPatient(patientId: string): Promise<Either<PatientWithConsultations, NextResponse>> {
        const patient = await prisma.patient.findUnique({
            where: {
                id: patientId
            },
            include: {
                consultations: {
                    include: {
                        messages: true
                    }
                }
            }
        })

        if (!patient)
            return new Either<Patient, NextResponse>(undefined, respond({
                message: `there is no patient with ID: ${patientId}`
            }))

        return new Either<Patient, NextResponse>(patient)
    }

    public async createPatient(userId: string, dto: AddPatientDto): Promise<Either<Patient, NextResponse>> {
        const bodyValidated = addPatientDtoSchema.safeParse(dto)
        if (!bodyValidated.success)
            return new Either<Patient, NextResponse>(undefined, respond({
                message: "Invalid body!",
                validationErrors: bodyValidated,
                status: 400
            }))

        const doctor = await prisma.user.findUnique({
            where: {
                id: userId
            }
        })

        if (!doctor)
            return new Either<Patient, NextResponse>(undefined, respond({
                message: `Could not find a doctor with ID: ${userId}`,
                status: 404
            }))

        const createdPatient = await prisma.patient.create({
            data: {
                ...dto,
                doctorId: userId
            }
        })

        return new Either<Patient, NextResponse>(createdPatient)
    }

    public async fetchConsultations(patientId: string) {
        return prisma.patientConsultation.findMany({
            where: {patientId},
            include: {
                messages: true
            }
        })
    }

    public async createConsultation(patientId: string, messages: Message[]): Promise<Either<PatientConsultation, NextResponse>> {
        const patient = await this.fetchPatient(patientId)
        if (patient.error)
            return new Either<PatientConsultation, NextResponse>(undefined, patient.error)

        const consultation = await prisma.patientConsultation.create({
            data: {patientId,}
        })

        await prisma.$transaction(
            messages.map(message => prisma.consultationMessage.create({
                data: {
                    content: message.content,
                    role: message.role,
                    consultationId: consultation.id,
                }
            }))
        )

        return new Either<PatientConsultation, NextResponse>(consultation)
    }
}

const userService = new UserService()
export default userService