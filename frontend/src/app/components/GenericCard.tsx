"use client";

import {Card, CardBody, CardProps} from "@nextui-org/card";
import React from "react";
import clsx from "clsx";

type Props = Omit<CardProps, "children"> & React.PropsWithChildren

export default function GenericCard({children, ...props}: Props) {
    return (
        <Card
            {...props}
            classNames={{
                base: clsx("rounded-2xl", props.classNames?.base),
                ...props.classNames
            }}
        >
            <CardBody>
                {children}
            </CardBody>
        </Card>
    );
}