import NextAuth, { DefaultSession } from "next-auth";
import authService from "@/app/api/auth/service";
import type {
    GetServerSidePropsContext,
    NextApiRequest,
    NextApiResponse,
} from "next";
import type { NextAuthOptions } from "next-auth";
import { getServerSession } from "next-auth";

const handler = NextAuth(authService.authOptions);

declare module "next-auth" {
    interface User {
        username: string;
        firstName: string;
        lastName: string;
    }

    interface Session extends DefaultSession {
        user?: User;
        accessToken?: string;
    }
}

export { handler as GET, handler as POST };

export function auth(
    ...args:
        | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
        | [NextApiRequest, NextApiResponse]
        | []
) {
    return getServerSession(...args, authService.authOptions);
}
