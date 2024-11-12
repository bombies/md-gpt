import {Message} from "@/app/patients/[id]/components/consultations/ConsultationChat";

export type PostPromptDto = {
    messages: Message[],
    prompt: string
}