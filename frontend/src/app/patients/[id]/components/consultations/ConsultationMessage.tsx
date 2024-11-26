import { FC, Fragment } from "react";
import { Message } from "@/app/patients/[id]/components/consultations/ConsultationChat";
import {
    Chip,
    cn,
    Divider,
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader,
    useDisclosure,
} from "@nextui-org/react";
import { CompletionRelevantSource } from "../../../../api/prompt/service";

type Props = Message;

const ConsultationMessage: FC<Props> = ({ role, content, relevantSources }) => {
    return (
        <div className={cn("flex w-full", role === "user" && "justify-end")}>
            <div
                className={cn(
                    "max-w-[55%] whitespace-pre-wrap space-y-2",
                    role === "user" && "justify-end"
                )}
            >
                <div
                    className={cn(
                        "flex w-fit ",
                        role === "user" && "!bg-primary/50",
                        "rounded-xl bg-neutral-200 p-4"
                    )}
                >
                    <p className="break-words">{content}</p>
                </div>

                {relevantSources?.length && (
                    <>
                        <p className="text-[.65rem] text-neutral-400">
                            Relevant Sources
                        </p>
                        <div className="flex flex-wrap gap-2 items-center">
                            {relevantSources.map((source) => (
                                <SourceChip
                                    key={`${source.documentId}#${source.fileId}`}
                                    source={source}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

const SourceChip: FC<{ source: CompletionRelevantSource }> = ({ source }) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    return (
        <>
            <Chip
                color="primary"
                size="sm"
                onClick={onOpen}
                className="cursor-pointer"
            >
                {source.sourceName}
            </Chip>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                scrollBehavior="inside"
                size="3xl"
            >
                <ModalContent>
                    <ModalHeader>{source.sourceName}</ModalHeader>
                    <ModalBody>
                        <h3 className="font-bold text-xl">
                            Some extracts related to the prompt
                        </h3>
                        <p className="text-xs text-neutral-400">
                            <span className="font-bold italic">NOTE:</span> each
                            section contains a string that represents a
                            collection of CSV data with the headers: id,
                            disease, symptom, reason, tests_and_procedures and
                            common_medications
                        </p>
                        {source.partitions.map((partition, i) => (
                            <Fragment key={`partition#${i}`}>
                                <div className="flex gap-2 items-center">
                                    <p className="font-semibold">Relevance:</p>
                                    <Chip color="success">
                                        {partition.relevance}
                                    </Chip>
                                </div>
                                <p>{partition.text}</p>
                                <Divider className="my-2" />
                            </Fragment>
                        ))}
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};

export default ConsultationMessage;
