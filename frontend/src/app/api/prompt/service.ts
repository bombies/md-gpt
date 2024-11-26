import { PostPromptDto } from "@/app/api/prompt/types";
import axios from "axios";

export type CompletionResponse = {
    question: string;
    noResult: boolean;
    text: string;
    relevantSources: CompletionRelevantSource[];
};

export type CompletionRelevantSource = {
    link: string;
    index: string;
    documentId: string;
    fileId: string;
    sourceContentType: string;
    sourceName: string;
    sourceUrl: string;
    partitions: {
        text: string;
        relevance: number;
    }[];
};

class PromptService {
    public async fetchCompletionResponse(
        dto: PostPromptDto
    ): Promise<CompletionResponse> {
        const response = await axios.post<CompletionResponse>(
            `${process.env.EXTERNAL_API_URL}/prompt`,
            dto
        );
        return response.data;
    }
}

const promptService = new PromptService();
export default promptService;
