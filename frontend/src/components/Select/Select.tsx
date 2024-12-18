import { forwardRef } from "react";
import { Box, Select as BaseSelect, Text } from "@radix-ui/themes";
import classes from "./Select.module.scss";
import { RequirementsTooltip } from "@/components/RequirementsTooltip/RequirementsTooltip";

type SelectProps = {
    onChange: (option: { target: { name: string; value: string } }) => void;
    options: { value: string; label: string }[];
    error?: string;
    help?: string;
    label: string;
    name: string;
};

export const Select = forwardRef<HTMLButtonElement, SelectProps>(
    ({ onChange, options, error, help, label, name, ...rest }, ref) => {
        return (
            <BaseSelect.Root name={name} onValueChange={(value) => onChange({ target: { name, value } })}>
                <Box className={classes.header}>
                    <Text className={classes.inputLabel}>{label}</Text>
                    <RequirementsTooltip error={error} content={help} />
                </Box>
                <BaseSelect.Trigger ref={ref} {...rest} />

                <BaseSelect.Content>
                    {options.map(({ value, label }) => (
                        <BaseSelect.Item key={value} value={value}>
                            {label}
                        </BaseSelect.Item>
                    ))}
                </BaseSelect.Content>
            </BaseSelect.Root>
        );
    }
);

Select.displayName = "Select";
