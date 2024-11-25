import "./globals.scss";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "@/app/components/Providers";
import NavBar from "@/app/components/NavBar";
import { auth } from "./api/auth/service";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "MD-GPT",
    description: "A web based diagnosis assistant.",
};

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();

    return (
        <html lang="en">
            <body className={inter.className}>
                <Providers session={session}>
                    <NavBar />
                    {children}
                </Providers>
            </body>
        </html>
    );
}
