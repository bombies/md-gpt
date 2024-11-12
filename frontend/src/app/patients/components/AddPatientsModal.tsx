"use client"

import {Dispatch, FC, SetStateAction} from "react";
import GenericModal from "@/app/components/GenericModal";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import axios from "axios";
import useSWRMutation from "swr/mutation";
import {Button} from "@nextui-org/react";
import GenericInput from "@/app/components/input/GenericInput";
import {AddPatientDto} from "@/app/api/users/types";
import {useSession} from "next-auth/react";
import {Patient} from "@prisma/client";
import toast from "react-hot-toast";

type AddPatientArgs = {
    arg: {
        dto: AddPatientDto
    }
}

const AddPatient = (userId?: string) => {
    const mutator = (url: string, {arg}: AddPatientArgs) => axios.post(url, arg.dto)
    return useSWRMutation(`/api/users/${userId}/patients`, mutator)
}

type Props = {
    modalOpen: boolean,
    setModalOpen: Dispatch<SetStateAction<boolean>>
}

const AddPatientsModal: FC<Props> = ({modalOpen, setModalOpen}) => {
    const {register, handleSubmit} = useForm()
    const {data: session} = useSession()
    const {trigger: addPatient, isMutating: isAdding} = AddPatient(session?.user?.id)

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        addPatient({
            dto: {
                firstName: data.firstName,
                lastName: data.lastName
            }
        })
            .then((res) => {
                const addedPatient: Patient = res.data
                toast.success("Successfully added a new patient!")
                setModalOpen(false)
            })
            .catch((err) => {
                console.error(err)
                toast.error("Could noy add a new patient!")
            })

    }

    return (
        <GenericModal
            title="Add A New Patient"
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-6">
                    <GenericInput
                        register={register}
                        id="firstName"
                        label="First Name"
                        placeholder="Enter a first name"
                        isDisabled={isAdding}
                        isRequired
                    />
                    <GenericInput
                        register={register}
                        id="lastName"
                        label="Last Name"
                        placeholder="Enter a last name"
                        isDisabled={isAdding}
                        isRequired
                    />
                    <Button
                        type="submit"
                        color="primary"
                        variant="shadow"
                        isDisabled={isAdding}
                        isLoading={isAdding}
                    >Create Patient</Button>
                </div>
            </form>
        </GenericModal>
    )
}

export default AddPatientsModal