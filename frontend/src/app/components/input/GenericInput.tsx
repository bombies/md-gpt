"use client";

import {FieldErrors, FieldValues, UseFormRegister} from "react-hook-form";
import {Input, InputProps} from "@nextui-org/input";
import clsx from "clsx";
import {useState} from "react";
import {SlotsToClasses} from "@nextui-org/react";
import LockIcon from "@/app/components/icons/LockIcon";
import UnlockIcon from "@/app/components/icons/UnlockIcon";

interface Props extends InputProps {
    id: string;
    register?: UseFormRegister<FieldValues>;
    errors?: FieldErrors,
}

export default function GenericInput({id, register, errors, radius, type, ...props}: Props) {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const togglePasswordVisibility = () => setPasswordVisible(prev => !prev);

    const className: SlotsToClasses<"description" | "errorMessage" | "label" | "base" | "mainWrapper" | "inputWrapper" | "innerWrapper" | "input" | "clearButton" | "helperWrapper"> | undefined
        = {
        inputWrapper: clsx(
            "transition-fast ring-1 !default-container !h-fit py-6 pr-3 pl-6 ring-neutral-200 hover:ring-primary hover:-translate-y-[0.15rem]",
            "group-data-[focused=true]:ring-primary",
            errors && (errors[id] && "ring-danger")
        ),
        input: "",
        label: "mb-4 text-sm font-semibold",
    };

    return register ?
        <Input
            {...register(id, {required: props.required || props.isRequired})}
            {...props}
            type={type === "password" ? (passwordVisible ? "text" : "password") : type}
            radius={radius || "lg"}
            endContent={
                props.endContent ||
                (type === "password" ?
                    passwordVisible ?
                        <LockIcon
                            width={16}
                            onClick={togglePasswordVisibility}
                            className="cursor-pointer"
                        />
                        :
                        <UnlockIcon
                            width={16}
                            onClick={togglePasswordVisibility}
                            className="cursor-pointer"
                        /> : undefined)
            }
            classNames={className}
            isInvalid={!!(errors && errors[id])}
        />
        :
        <Input
            {...props}
            type={type === "password" ? (passwordVisible ? "text" : "password") : type}
            radius={radius || "lg"}
            endContent={
                props.endContent ||
                (type === "password" ?
                    passwordVisible ?
                        <LockIcon
                            width={16}
                            onClick={togglePasswordVisibility}
                            className="cursor-pointer"
                        />
                        :
                        <UnlockIcon
                            width={16}
                            onClick={togglePasswordVisibility}
                            className="cursor-pointer"
                        /> : undefined)
            }
            classNames={className}
            isInvalid={!!(errors && errors[id])}
        />;
}