"use client"

import {FC} from "react";
import {useSession} from "next-auth/react";
import {Spacer} from "@nextui-org/react";
import PatientsGrid from "@/app/patients/components/PatientsGrid";
import AddPatientButton from "@/app/patients/components/AddPatientButton";

const PatientsPage: FC = () => {
    const session = useSession()

    return (
        <main className="p-16">
            <h1 className="text-5xl font-bold">Welcome back, <span
                className="text-primary capitalize">{session.data?.user?.firstName}</span></h1>
            <Spacer y={16}/>
            <div className="flex gap-4">
                <h3 className="text-2xl font-semibold self-center">Your Patients</h3>
                <AddPatientButton />
            </div>
            <Spacer y={6}/>
            <PatientsGrid/>
        </main>
    )
}

export default PatientsPage