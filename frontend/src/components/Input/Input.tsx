import { forwardRef } from "react";

import classes from "./Input.module.scss";
import { Box, TextArea, Text, TextField } from "@radix-ui/themes";
import { RequirementsTooltip } from "@/components/RequirementsTooltip/RequirementsTooltip";

interface InputProps {
    label: string;
    help: string;
    type?: "password" | "email" | "textarea" | "text";
    error?: string;
}

export const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>(
    ({ label, error, help, type = "text", ...props }: InputProps, ref) => {
        return (
            <label className={classes.input}>
                <Box className={classes.header}>
                    <Text className={classes.inputLabel}>{label}</Text>
                    <RequirementsTooltip error={error} content={help} />
                </Box>

                {type === "textarea" ? (
                    <TextArea
                        resize="vertical"
                        aria-invalid={!!error}
                        ref={ref as React.Ref<HTMLTextAreaElement>}
                        {...props}
                    />
                ) : (
                    <TextField.Root
                        type={type}
                        aria-invalid={!!error}
                        ref={ref as React.Ref<HTMLInputElement>}
                        {...props}
                    />
                )}
            </label>
        );
    }
);

Input.displayName = "Input";
