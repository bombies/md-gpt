import {authenticated} from "@/app/api/utils";
import {PostPromptDto} from "@/app/api/prompt/types";
import promptService from "@/app/api/prompt/service";
import {NextResponse} from "next/server";

export async function POST(req: Request) {
    return authenticated(async () => {
        const body: PostPromptDto = await req.json()
        const response = await promptService.fetchCompletionResponse(body)
        return NextResponse.json({response})
    })
}