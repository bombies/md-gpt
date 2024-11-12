import {getServerSession, Session} from "next-auth";
import authService from "@/app/api/auth/service";
import {NextResponse} from "next/server";
import {z} from "zod";
import axios from "axios";

export class Either<S, E> {
    constructor(readonly success?: S, readonly error?: E) {
    }
}

export const authenticated = async (job: (session: Session) => Promise<NextResponse>) => {
    const session = await getServerSession(authService.authOptions);
    if (!session)
        return respond({
            message: "You aren't authenticated",
            status: 403
        })
    return job(session!);
}

export const secured = async (req: Request, job: () => Promise<NextResponse>) => {
    const key = req.headers.get("authorization")
    if (key !== process.env.SECRET_KEY)
        respond({
            message: "Invalid authorization!",
            status: 403
        })
    return job()
}

export const respond = ({data, message, validationErrors, ...init}: {
    data?: any,
    message?: string,
    validationErrors?: z.SafeParseReturnType<any, any>
} & ResponseInit): NextResponse => {
    return NextResponse.json((!validationErrors?.success ? {
        message: validationErrors?.error.errors.map(err => err.message).join(". ") || message,
        data: validationErrors?.error.errors
    } : data) || {
        message
    }, init);
}