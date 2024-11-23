import {FC} from "react";
import SpecificPatientContext from "@/app/patients/[id]/components/SpecificPatientContext";

type Context = {
    params: {
        id: string
    }
}

const SpecificPatientPage: FC<Context> = async props => {
    const params = await props.params;
    return (
        <main>
            <SpecificPatientContext patientId={params.id}/>
        </main>
    )
}

export default SpecificPatientPage