"use client"

import {FC, Fragment, useState} from "react";
import SignUpModal from "@/app/components/nav/sign-in/SignUpModal";
import {Button} from "@nextui-org/react";

const SignUpButton: FC = () => {
    const [modalOpen, setModalOpen] = useState(false)

    return (
        <Fragment>
            <SignUpModal modalOpen={modalOpen} setModalOpen={setModalOpen}/>
            <Button
                color="primary"
                variant="shadow"
                onPress={() => setModalOpen(true)}
            >Sign Up</Button>
        </Fragment>
    )
}

export default SignUpButton