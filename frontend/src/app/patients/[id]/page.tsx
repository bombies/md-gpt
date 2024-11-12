import {FC} from "react";
import SpecificPatientContext from "@/app/patients/[id]/components/SpecificPatientContext";

type Context = {
    params: {
        id: string
    }
}

const SpecificPatientPage: FC<Context> = ({params}) => {
    return (
        <main>
            <SpecificPatientContext patientId={params.id}/>
        </main>
    )
}

export default SpecificPatientPage