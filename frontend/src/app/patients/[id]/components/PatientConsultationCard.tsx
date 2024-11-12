import {FC, Fragment, useState} from "react";
import GenericCard from "@/app/components/GenericCard";
import {PatientConsultationWithMessages} from "@/app/api/users/types";
import ConsultationModal from "@/app/patients/[id]/components/consultations/ConsultationModal";
import {Message} from "@/app/patients/[id]/components/consultations/ConsultationChat";
import {Button} from "@nextui-org/react";

type Props = {
    consultation: PatientConsultationWithMessages
    doctorId: string,
    patientId: string,
}

const PatientConsultationCard: FC<Props> = ({consultation, doctorId, patientId}) => {
    const [modalOpen, setModalOpen] = useState(false)
    const [messages, setMessages] = useState<Message[]>(consultation.messages.map<Message>(message => ({
        content: message.content,
        role: message.role as "system" | "user"
    })) ?? [])

    return (
        <Fragment>
            <ConsultationModal
                modalOpen={modalOpen}
                setModalOpen={setModalOpen}
                messages={messages}
                setMessages={setMessages}
                doctorId={doctorId}
                patientId={patientId}
            />
            <div
                onClick={() => {
                    console.log("click")
                    setModalOpen(true)
                }}
            >
                <GenericCard
                    classNames={{
                        base: "hover:!border-primary border-1 transition-faster cursor-pointer"
                    }}

                >
                    <h3>{new Date(consultation.createdAt).toDateString()}, {new Date(consultation.createdAt).toLocaleTimeString("en-JM", {
                        timeStyle: "short"
                    })}</h3>
                </GenericCard>
            </div>

        </Fragment>

    )
}

export default PatientConsultationCard