import {FC} from "react";
import {
    Avatar,
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownSection,
    DropdownTrigger
} from "@nextui-org/react";
import {useRouter} from "next/navigation";
import {signOut} from "next-auth/react";

const UserPopout: FC = () => {
    const router = useRouter()

    return (
        <Dropdown
            className="phone:w-64 w-96"
            classNames={{
                base: "bg-neutral-100/70 dark:bg-black/70 backdrop-blur-md border-1 dark:border-white/20 border-black/20",
            }}
        >
            <DropdownTrigger>
                <Avatar
                    isBordered
                    color="primary"
                    size="sm"
                    as="button"
                    className="tablet:m-3"
                />
            </DropdownTrigger>
            <DropdownMenu
                aria-label="User Profile Dropdown"
                itemClasses={{
                    base: `
                                data-[hover=true]:bg-primary/20
                                py-4
                            `
                }}
                onAction={key => {
                    switch (key) {
                        case "patients": {
                            router.push("/patients")
                            break;
                        }
                    }
                }}
            >
                <DropdownSection showDivider>
                    <DropdownItem
                        key="patients"
                        description="Manage your patients."
                    >
                        Your Patients
                    </DropdownItem>
                </DropdownSection>
                <DropdownItem key="logout_button" isReadOnly>
                    <Button
                        color="primary"
                        variant="shadow"
                        onPress={() => signOut({
                            callbackUrl: '/'
                        })}
                    >Sign Out</Button>
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    )
}

export default UserPopout