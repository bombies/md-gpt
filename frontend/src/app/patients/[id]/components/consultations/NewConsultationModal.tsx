"use client"

import {Dispatch, FC, SetStateAction, useState} from "react";
import GenericModal from "@/app/components/GenericModal";
import ConsultationChat, {Message} from "@/app/patients/[id]/components/consultations/ConsultationChat";
import {Button, Divider} from "@nextui-org/react";
import SaveConsultationButton from "@/app/patients/[id]/components/consultations/SaveConsultationButton";
import ConsultationModal from "@/app/patients/[id]/components/consultations/ConsultationModal";

type Props = {
    modalOpen: boolean,
    setModalOpen: Dispatch<SetStateAction<boolean>>,
    doctorId: string,
    patientId: string
}

const NewConsultationModal: FC<Props> = ({modalOpen, setModalOpen, patientId, doctorId}) => {
    const [messages, setMessages] = useState<Message[]>([{
        role: "system",
        content: "Hey there! I'm here to help you properly diagnose patients 😀. Any observations you've made please tell them mto me, as well as any additional details."
    }])

    return (
        <ConsultationModal
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
            messages={messages}
            setMessages={setMessages}
            doctorId={doctorId}
            patientId={patientId}
        />
    )
}

export default NewConsultationModal