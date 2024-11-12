"use state"

import {FC, Fragment, useState} from "react";
import LogInModal from "@/app/components/nav/log-in/LogInModal";
import {Button} from "@nextui-org/react";

const LogInButton: FC = () => {
    const [modalOpen, setModalOpen] = useState(false)

    return (
        <Fragment>
            <LogInModal modalOpen={modalOpen} setModalOpen={setModalOpen}/>
            <Button
                color="primary"
                variant="bordered"
                onPress={() => setModalOpen(true)}
            >
                Log In
            </Button>
        </Fragment>
    )
}

export default LogInButton