import {PostPromptDto} from "@/app/api/prompt/types";
import axios from "axios";

class PromptService {

    public async fetchCompletionResponse(dto: PostPromptDto): Promise<string> {
        const response = await axios.post(`${process.env.EXTERNAL_API_URL}/prompt`, dto)
        return response.data.content
    }

}

const promptService = new PromptService()
export default promptService