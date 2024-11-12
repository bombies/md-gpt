"use client"

import {FC, Fragment, useEffect, useMemo} from "react";
import GenericInput from "@/app/components/input/GenericInput";
import {Spacer} from "@nextui-org/react";
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";
import useSWR from "swr";
import {Patient} from "@prisma/client";
import {Spinner} from "@nextui-org/spinner";
import PatientCard from "@/app/patients/components/PatientCard";
import axios from "axios";
import GenericCard from "@/app/components/GenericCard";

export async function fetcher<T>(url: string): Promise<T | undefined> {
    try {
        return (await axios.get(url)).data;
    } catch (e) {
        // console.error(e);
        throw e;
    }
}

const FetchPatients = (userId?: string) => {
    return useSWR(userId && `/api/users/${userId}/patients`, fetcher<Patient[]>)
}

const PatientsGrid: FC = () => {
    const session = useSession()
    const router = useRouter()
    const {data: patients, isLoading: patientsLoading} = FetchPatients(session.data?.user?.id)

    useEffect(() => {
        if (session.status !== "loading" && !session.data)
            router.push("/")
    })

    const patientCards = useMemo(() => patients?.map(patient => (
        <PatientCard key={patient.id} patient={patient}/>
    )) ?? [], [patients])

    return (
        <Fragment>
            <div className="w-80 tablet:w-1/2 phone:w-full">
                <GenericInput
                    id="patient_search"
                    placeholder="Search for a patient..."
                    label="Search"
                />
            </div>
            <Spacer y={6}/>
            {
                patientsLoading ?
                    <Spinner size="lg"/>
                    :
                    (
                        !patients?.length ?
                            <GenericCard className="w-96">
                                <h3 className="font-semibold text-xl">You have no patients...</h3>
                            </GenericCard>
                            :
                            <div className="grid grid-cols-3 tablet:grid-cols-1 gap-4">
                                {patientCards}
                            </div>
                    )
            }
        </Fragment>
    )
}

export default PatientsGrid