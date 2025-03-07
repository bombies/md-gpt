import NextAuth, { DefaultSession } from "next-auth";
import authService from "@/app/api/auth/service";

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
