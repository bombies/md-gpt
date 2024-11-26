"use client";

import {
    Dispatch,
    FC,
    Fragment,
    SetStateAction,
    useCallback,
    useMemo,
    useState,
} from "react";
import GenericInput from "@/app/components/input/GenericInput";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Button, ScrollShadow, Spacer } from "@nextui-org/react";
import ConsultationMessage from "@/app/patients/[id]/components/consultations/ConsultationMessage";
import SendIcon from "@/app/components/icons/SendIcon";
import axios from "axios";
import useSWRMutation from "swr/mutation";
import { PostPromptDto } from "@/app/api/prompt/types";
import toast from "react-hot-toast";
import {
    CompletionRelevantSource,
    CompletionResponse,
} from "../../../../api/prompt/service";

export type Message = {
    role: "system" | "user";
    content: string;
    relevantSources?: CompletionRelevantSource[];
};

type FetchResponseArgs = {
    arg: {
        dto: PostPromptDto;
    };
};

const FetchResponse = () => {
    const mutator = (url: string, { arg }: FetchResponseArgs) =>
        axios.post<CompletionResponse>(url, arg.dto);
    return useSWRMutation("/api/prompt", mutator);
};

type Props = {
    messages: Message[];
    setMessages: Dispatch<SetStateAction<Message[]>>;
};

const ConsultationChat: FC<Props> = ({ messages, setMessages }) => {
    const { register, handleSubmit, reset } = useForm();
    const { trigger: respond, isMutating: isResponding } = FetchResponse();

    const addMessage = useCallback(
        (message: Message) => {
            setMessages((prev) => [...prev, message]);
        },
        [setMessages]
    );

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        const message: Message = {
            role: "user",
            content: data.consultation_chat,
        };

        addMessage(message);
        reset();

        respond({
            dto: {
                messages,
                prompt: data.consultation_chat,
            },
        })
            .then((res) => {
                const response = res.data.text;
                addMessage({
                    role: "system",
                    content: response,
                    relevantSources: res.data.relevantSources,
                });
            })
            .catch((e) => {
                console.error(e);
                toast.error("Could not generate a response!");
            });
    };

    const messageElements = useMemo(
        () =>
            messages.map((message, i) => (
                <ConsultationMessage
                    key={i}
                    role={message.role}
                    content={message.content}
                    relevantSources={message.relevantSources?.slice(
                        0,
                        Math.min(message.relevantSources.length, 3)
                    )}
                />
            )),
        [messages]
    );

    return (
        <Fragment>
            <ScrollShadow
                hideScrollBar
                className="w-full space-y-3 max-h-[35rem] overflow-y-auto"
                size={20}
            >
                {messageElements}
            </ScrollShadow>
            <Spacer y={6} />
            <form onSubmit={handleSubmit(onSubmit)}>
                <GenericInput
                    isDisabled={isResponding}
                    register={register}
                    id="consultation_chat"
                    placeholder="Enter something..."
                    endContent={
                        <Button
                            isDisabled={isResponding}
                            isIconOnly
                            isLoading={isResponding}
                            type="submit"
                            variant="shadow"
                            color="primary"
                        >
                            <SendIcon />
                        </Button>
                    }
                />
            </form>
        </Fragment>
    );
};

export default ConsultationChat;
