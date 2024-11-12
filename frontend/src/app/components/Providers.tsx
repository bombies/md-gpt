"use client"

import {NextUIProvider} from "@nextui-org/react";
import {Session} from "next-auth";
import {ThemeProvider} from "next-themes";
import React, {FC} from "react";
import {SessionProvider} from "next-auth/react";
import {Toaster} from "react-hot-toast";

type Props = React.PropsWithChildren & {
    session: Session | null;
}

const Providers: FC<Props> = ({children, session}) => {
    return (
        <NextUIProvider>
            <ThemeProvider attribute="class" defaultTheme="light">
                <SessionProvider session={session}>
                    <Toaster
                        position="top-center"
                        reverseOrder
                        toastOptions={{
                            className: `
                                        backdrop-blur-sm p-6
                                        min-w-96 max-w-[32rem]
                                        flex
                                        gap-4
                                        justify-between`,
                            style: {
                                background: "#100f1090",
                                color: "#ffffff",
                                border: "2px solid #00000005",
                                borderRadius: "1.5rem",
                                padding: "1.5rem"
                            }
                        }}
                    />
                    {children}
                </SessionProvider>
            </ThemeProvider>
        </NextUIProvider>
    )
}

export default Providers