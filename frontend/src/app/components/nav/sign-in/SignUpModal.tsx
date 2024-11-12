"use client"

import {Dispatch, FC, SetStateAction} from "react";
import GenericModal from "@/app/components/GenericModal";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import {RegisterUserDto} from "@/app/api/auth/types";
import axios from "axios";
import useSWRMutation from "swr/mutation";
import {Button} from "@nextui-org/react";
import GenericInput from "@/app/components/input/GenericInput";
import toast from "react-hot-toast";

type Props = {
    modalOpen: boolean,
    setModalOpen: Dispatch<SetStateAction<boolean>>
}

type RegisterUserArgs = {
    arg: {
        dto: RegisterUserDto
    }
}

const RegisterUser = () => {
    const mutator = (url: string, {arg}: RegisterUserArgs) => axios.post(url, arg.dto)
    return useSWRMutation("/api/auth/register", mutator)
}

const SignUpModal: FC<Props> = ({modalOpen, setModalOpen}) => {
    const {register, handleSubmit} = useForm()
    const {trigger: registerUser, isMutating: isRegistering} = RegisterUser()

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        const {username, firstName, lastName, email, password} = data
        registerUser({
            dto: {username, firstName, lastName, email, password}
        })
            .then(() => {
                toast.success("Successfully registered")
                setModalOpen(false)
            })
            .catch((e) => {
                console.error(e)
                toast.error("Could not register!")
            })
    }

    return (
        <GenericModal
            title="Sign Up"
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-6">
                    <GenericInput
                        register={register}
                        id="username"
                        placeholder="Enter a username"
                        label="Username"
                        isRequired
                    />
                    <GenericInput
                        register={register}
                        id="email"
                        placeholder="Enter an email"
                        label="Email Address"
                        type="email"
                        isRequired
                    />
                    <div className="flex gap-4">
                        <GenericInput
                            register={register}
                            id="firstName"
                            placeholder="Enter your first name"
                            label="First Name"
                            isRequired
                        />
                        <GenericInput
                            register={register}
                            id="lastName"
                            placeholder="Enter a you last name"
                            label="Last Name"
                            isRequired
                        />
                    </div>
                    <GenericInput
                        register={register}
                        id="password"
                        placeholder="Enter a password"
                        label="Password"
                        isRequired
                        type="password"
                    />
                    <Button
                        isLoading={isRegistering}
                        type="submit"
                        color="primary"
                        variant="shadow"
                    >
                        Sign Up
                    </Button>
                </div>
            </form>
        </GenericModal>
    )
}

export default SignUpModal