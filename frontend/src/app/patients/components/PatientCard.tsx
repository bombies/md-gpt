import {FC} from "react";
import GenericCard from "@/app/components/GenericCard";
import {Patient} from "@prisma/client";
import Link from "next/link";

type Props = {
    patient: Patient
}

const PatientCard: FC<Props> = ({patient}) => {
    return (
        <Link href={`/patients/${patient.id}`}>
            <GenericCard classNames={{
                base: "hover:!border-primary border-1 transition-faster"
            }}>
                <h3>{patient.firstName} {patient.lastName}</h3>
            </GenericCard>
        </Link>

    )
}

export default PatientCard