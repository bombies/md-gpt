"use client"

import {FC} from "react";
import {Button} from "@nextui-org/react";
import {PatientConsultation} from "@prisma/client";
import axios from "axios";
import useSWRMutation from "swr/mutation";
import {CreateConsultationDto} from "@/app/api/users/types";
import {Message} from "@/app/patients/[id]/components/consultations/ConsultationChat";
import toast from "react-hot-toast";

type Props = {
    doctorId?: string,
    patientId?: string,
    onSave: (consultation: PatientConsultation) => void,
    messages: Message[]
}

type SaveConsultationArgs = {
    arg: {
        dto: CreateConsultationDto
    }
}

const SaveConsultation = (doctorId?: string, patientId?: string) => {
    const mutator = (url: string, {arg}: SaveConsultationArgs) => axios.post(url, arg.dto)
    return useSWRMutation(`/api/users/${doctorId}/patients/${patientId}/consultations`, mutator)
}

const SaveConsultationButton: FC<Props> = ({doctorId, patientId, onSave, messages}) => {
    const {trigger: saveConsultation, isMutating: isSaving} = SaveConsultation(doctorId, patientId)

    return (
        <Button
            variant="shadow"
            color="primary"
            isDisabled={isSaving}
            isLoading={isSaving}
            onPress={() => {
                saveConsultation({
                    dto: {messages}
                })
                    .then((res) => {
                        const consultation: PatientConsultation = res.data
                        toast.success("Successfully saved this consultation!")
                        onSave(consultation)
                    })
                    .catch((e) => {
                        console.error(e)
                        toast.error("Could not save this consultation...")
                    })
            }}
        >
            Save Consultation
        </Button>
    )
}

export default SaveConsultationButton