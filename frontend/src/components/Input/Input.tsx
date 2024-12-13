import { forwardRef } from "react";
import classes from "./Input.module.scss";
import { Text, TextField } from "@radix-ui/themes";
import { RequirementsTooltip } from "@/components/RequirementsTooltip/RequirementsTooltip";

type InputProps = {
    label: string;
    help: string;
    type?: "password" | "email";
    error?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(({ label, error, help, ...props }: InputProps, ref) => {
    return (
        <label className={classes.input}>
            <Text className={classes.inputLabel}>{label}</Text>
            <TextField.Root {...props} ref={ref}>
                <TextField.Slot side="right">
                    <RequirementsTooltip error={error} content={help} />
                </TextField.Slot>
            </TextField.Root>
        </label>
    );
});

Input.displayName = "Input";
