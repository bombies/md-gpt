"use client";

import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalProps } from "@nextui-org/modal";
import React, { JSX } from "react";
import clsx from "clsx";

type Props = {
    title: string
    footerContent?: JSX.Element,
    bodyClassName?: string,
} & React.PropsWithChildren & ModalProps

export default function GenericModal({ title, children, footerContent, bodyClassName, ...modalProps }: Props) {
    return (
        <Modal
            {...modalProps}
            size={modalProps.size || "2xl"}
            className={clsx(
                modalProps.className,
                "backdrop-blur-md"
            )}
            backdrop="blur"
            placement="center"
        >
            <ModalContent>
                <ModalHeader>
                    <h3 className="capitalize">{title}</h3>
                </ModalHeader>
                <ModalBody>
                    <div className={clsx("p-6", bodyClassName)}>
                        {children}
                    </div>
                </ModalBody>
                {
                    footerContent &&
                    <ModalFooter>
                        {footerContent}
                    </ModalFooter>
                }
            </ModalContent>
        </Modal>
    );
}