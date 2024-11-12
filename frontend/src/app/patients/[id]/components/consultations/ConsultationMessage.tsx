import {FC} from "react";
import {Message} from "@/app/patients/[id]/components/consultations/ConsultationChat";
import clsx from "clsx";

type Props = Message

const ConsultationMessage: FC<Props> = ({role, content}) => {
    return (
        <div className={clsx("flex w-full", role === "user" && "justify-end")}>
            <div className={clsx(
                "flex w-fit max-w-[55%] whitespace-pre-wrap",
                role === "user" && "justify-end !bg-primary/50",
                "rounded-xl bg-neutral-200 p-4"
            )}>
                <p className="break-words">
                    {content}
                </p>
            </div>
        </div>

    )
}

export default ConsultationMessage