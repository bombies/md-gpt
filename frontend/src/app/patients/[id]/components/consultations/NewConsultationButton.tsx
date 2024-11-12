"use client"

import {FC, Fragment, useState} from "react";
import {Button} from "@nextui-org/react";
import NewConsultationModal from "@/app/patients/[id]/components/consultations/NewConsultationModal";

type Props = {
    doctorId: string,
    patientId: string,
}

const NewConsultationButton: FC<Props> = ({doctorId, patientId}) => {
    const [modal, setModalOpen] = useState(false)

    return (
        <Fragment>
            <NewConsultationModal
                modalOpen={modal}
                setModalOpen={setModalOpen}
                doctorId={doctorId}
                patientId={patientId}
            />
            <Button
                variant="light"
                color="primary"
                onPress={() => setModalOpen(true)}
            >
                New Consultation
            </Button>
        </Fragment>
    )
}

export default NewConsultationButton