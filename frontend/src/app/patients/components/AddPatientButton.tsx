import {Fragment, useState} from "react";
import {Button} from "@nextui-org/react";
import AddPatientsModal from "@/app/patients/components/AddPatientsModal";

const AddPatientButton = () => {
    const [modal, setModalOpen] = useState(false)

    return (
        <Fragment>
            <AddPatientsModal
                modalOpen={modal}
                setModalOpen={setModalOpen}
            />
            <Button
                color="primary"
                variant="light"
                onClick={() => setModalOpen(true)}
            >
                Add Patient
            </Button>
        </Fragment>
    )
}

export default AddPatientButton