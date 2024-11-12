"use client"

import {Dispatch, FC, SetStateAction, useState} from "react";
import GenericModal from "@/app/components/GenericModal";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import {Button} from "@nextui-org/react";
import GenericInput from "@/app/components/input/GenericInput";
import {signIn} from "next-auth/react";
import toast from "react-hot-toast";

type Props = {
    modalOpen: boolean,
    setModalOpen: Dispatch<SetStateAction<boolean>>
}

const LogInModal: FC<Props> = ({modalOpen, setModalOpen}) => {
    const {register, handleSubmit} = useForm()
    const [loggingIn, setLoggingIn] = useState(false)

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setLoggingIn(true)
        signIn('credentials', {
            redirect: false,
            email: data.usernameOrEmail,
            password: data.password
        }).then(cb => {
            if (cb?.error) {
                toast.error("Invalid credentials! Please check your details and try again.");
            } else if (cb?.ok) {
                toast.success("Logged in!");
                setModalOpen(false)
            }
        }).finally(() => {
            setLoggingIn(false)
        })
    }

    return (
        <GenericModal
            title="Log In"
            isOpen={modalOpen}
            onClose={() => setModalOpen(true)}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-6">
                    <GenericInput
                        register={register}
                        label="Username/Email"
                        id="usernameOrEmail"
                        isRequired={true}
                        isDisabled={loggingIn}
                    />
                    <GenericInput
                        register={register}
                        label="Password"
                        type="password"
                        id="password"
                        isDisabled={loggingIn}
                        isRequired={true}
                    />
                    <Button
                        type="submit"
                        isDisabled={loggingIn}
                        isLoading={loggingIn}
                        color="primary"
                    >
                        Log In
                    </Button>
                </div>
            </form>
        </GenericModal>
    )
}

export default LogInModal