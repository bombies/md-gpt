import {Dispatch, FC, SetStateAction} from "react";
import ConsultationChat, {Message} from "@/app/patients/[id]/components/consultations/ConsultationChat";
import {Button, Divider} from "@nextui-org/react";
import SaveConsultationButton from "@/app/patients/[id]/components/consultations/SaveConsultationButton";
import GenericModal from "@/app/components/GenericModal";

type Props = {
    modalOpen: boolean,
    setModalOpen: Dispatch<SetStateAction<boolean>>,
    messages: Message[],
    setMessages: Dispatch<SetStateAction<Message[]>>,
    doctorId: string,
    patientId: string,
}

const ConsultationModal: FC<Props> = ({modalOpen, setModalOpen, messages, setMessages, doctorId, patientId}) => {
    return (
        <GenericModal
            title="New Consultation"
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            size="3xl"
        >
            <ConsultationChat
                messages={messages}
                setMessages={setMessages}
            />
            <Divider className="my-6"/>
            <div className="flex gap-4 justify-end">
                <SaveConsultationButton
                    onSave={() => {
                        setModalOpen(false)
                    }}
                    messages={messages}
                    doctorId={doctorId}
                    patientId={patientId}
                />
                <Button
                    variant="flat"
                    color="danger"
                    onPress={() => setModalOpen(false)}
                >
                    Forget
                </Button>
            </div>
        </GenericModal>
    )
}

export default ConsultationModal