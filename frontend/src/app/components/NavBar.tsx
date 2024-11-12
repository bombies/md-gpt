"use client"

import {FC, Fragment} from "react";
import {
    Button,
    Dropdown, DropdownItem, DropdownMenu, DropdownSection,
    DropdownTrigger,
    Navbar as NextNavbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem
} from "@nextui-org/react";
import Link from "next/link";
import {useRouter} from "next/navigation";
import HamburgerIcon from "@/app/components/icons/HamburgerIcon";
import {useTheme} from "next-themes";
import AboutIcon from "@/app/components/icons/AboutIcon";
import SignUpButton from "@/app/components/nav/sign-in/SignUpButton";
import LogInButton from "@/app/components/nav/log-in/LogInButton";
import {useSession} from "next-auth/react";
import UserPopout from "@/app/components/nav/user-popout/UserPopout";

const NavBar: FC = () => {
    const {theme, setTheme} = useTheme()
    const router = useRouter()
    const session = useSession()

    return (
        <header>
            <NextNavbar
                shouldHideOnScroll
                classNames={{
                    base: `bg-secondary/40 py-3 dark:bg-black/70 dark:text-white`
                }}
            >
                <NavbarBrand>
                    <Link href='/'
                          className='font-black text-white text-xl tracking-[.125em] self-center'>MD-GPT</Link>
                </NavbarBrand>
                <NavbarContent className="gap-12 tablet:hidden" justify="end">
                    <NavbarItem>
                        <Link href='/#about' className="font-light text-white text-xl self-center !no-underline">ABOUT
                            US</Link>
                    </NavbarItem>
                    {
                        session.status === "authenticated" ?
                            <NavbarItem>
                                <UserPopout/>
                            </NavbarItem>
                            :
                            <Fragment>
                                <NavbarItem>
                                    <SignUpButton/>
                                </NavbarItem>
                                <NavbarItem>
                                    <LogInButton/>
                                </NavbarItem>
                            </Fragment>
                    }
                </NavbarContent>
                <NavbarContent className="hidden tablet:flex" justify="end">
                    <Dropdown
                        className="phone:w-64 w-96"
                        classNames={{
                            base: "bg-neutral-100/70 dark:bg-black/70 backdrop-blur-md border-1 dark:border-white/20 border-black/50",
                        }}
                    >
                        <NavbarItem>
                            <DropdownTrigger>
                                <Button
                                    isIconOnly
                                    variant="light"
                                    startContent={<HamburgerIcon fill={theme === "dark" ? "#fff" : "#000"}/>}
                                />
                            </DropdownTrigger>
                        </NavbarItem>
                        <DropdownMenu
                            aria-label="Mobile Navigation Dropdown"
                            itemClasses={{
                                base: `
                                data-[hover=true]:bg-primary/20
                                py-4
                            `
                            }}
                            onAction={key => {
                                switch (key) {
                                    case "about": {
                                        router.push("/#about")
                                        break;
                                    }
                                }
                            }}
                        >
                            <DropdownSection showDivider>
                                <DropdownItem
                                    key="about"
                                    startContent={<AboutIcon width={20} fill={"#a24fff"}/>}
                                    description="Learn more about us"
                                >
                                    About Us
                                </DropdownItem>
                            </DropdownSection>
                            {
                                session.status === "authenticated" ?
                                    <DropdownItem
                                        isReadOnly
                                        key="user_profile"
                                    >
                                        <UserPopout/>
                                    </DropdownItem>
                                    :
                                    <Fragment>
                                        <DropdownItem
                                            isReadOnly
                                            key="sign_up"
                                        >
                                            <SignUpButton/>
                                        </DropdownItem>
                                        <DropdownItem
                                            isReadOnly
                                            key="sign_in"
                                        >
                                            <LogInButton/>
                                        </DropdownItem>
                                    </Fragment>
                            }
                        </DropdownMenu>
                    </Dropdown>
                </NavbarContent>
            </NextNavbar>
        </header>
    )
}

export default NavBar