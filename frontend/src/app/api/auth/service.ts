import {PrismaAdapter} from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import {compare} from "bcrypt";
import {AuthOptions} from "next-auth";
import prisma from "@/app/libs/prisma";
import {RegisterUserDto, registerUserDtoSchema} from "@/app/api/auth/types";
import {Either, respond} from "@/app/api/utils";
import {User} from "@prisma/client";
import {NextResponse} from "next/server";
import bcrypt from 'bcrypt';

class AuthService {
    public authOptions: AuthOptions = {
        adapter: PrismaAdapter(prisma),
        providers: [
            CredentialsProvider({
                name: "credentials",
                credentials: {
                    email: {label: "email", type: "text"},
                    password: {label: "password", type: "password"}
                },
                // @ts-ignore
                async authorize(credentials) {
                    if (!credentials) throw new Error("Missing credentials!");

                    const fetchedUser = (await prisma.user.findMany({
                        where: {
                            OR: [
                                {email: credentials.email},
                                {username: credentials.email}
                            ]
                        }
                    }))[0];
                    console.log(fetchedUser, credentials.email)

                    if (!fetchedUser) throw new Error("Invalid credentials!");

                    const result = await compare(credentials.password, fetchedUser.password);
                    if (result)
                        return {
                            username: fetchedUser.username,
                            firstName: fetchedUser.firstName,
                            lastName: fetchedUser.lastName,
                            id: fetchedUser.id
                        };
                    else throw new Error("Invalid credentials!");
                }
            })
        ],
        session: {
            strategy: "jwt",
            maxAge: 24 * 60 * 60 // 1 day
        },
        jwt: {
            maxAge: 24 * 60 * 60 // 1 day
        },
        callbacks: {
            async jwt({token, user, account}) {
                if (user)
                    token = {...token, ...user};
                token.accessToken = account?.access_token;
                return token;
            },
            session({token, session}) {
                if (token && session.user)
                    session.user = {...session.user, ...token};

                session.accessToken = token.accessToken as string;
                return session;
            }
        },
        debug: process.env.NODE_ENV === "development",
        secret: process.env.NEXTAUTH_SECRET
    }

    public async registerUser(dto: RegisterUserDto): Promise<Either<User, NextResponse>> {
        const dtoValidated = registerUserDtoSchema.safeParse(dto)
        if (!dtoValidated.success)
            return new Either<User, NextResponse>(undefined, respond({
                message: "Invalid body!",
                validationErrors: dtoValidated,
                status: 400
            }))

        const existingUser = await prisma.user.findMany({
            where: {
                OR: [
                    {username: dto.username.toLowerCase()},
                    {email: dto.email.toLowerCase()}
                ]
            }
        })

        if (existingUser.length)
            return new Either<User, NextResponse>(undefined, respond({
                message: "There is already a user with that email or username!",
                status: 400
            }))

        const salt = await bcrypt.genSalt(12)
        const hashedPassword = await bcrypt.hash(dto.password, salt)
        const createdUser = await prisma.user.create({
            data: {
                firstName: dto.firstName.toLowerCase(),
                lastName: dto.lastName.toLowerCase(),
                username: dto.username.toLowerCase(),
                email: dto.email.toLowerCase(),
                password: hashedPassword
            }
        })
        return new Either<User, NextResponse>(createdUser)
    }

    public loginUser() {

    }
}

const authService = new AuthService()
export default authService
