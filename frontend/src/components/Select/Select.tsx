import { forwardRef } from "react";
import { Box, Select as BaseSelect, Text } from "@radix-ui/themes";
import classes from "./Select.module.scss";
import { RequirementsTooltip } from "@/components/RequirementsTooltip/RequirementsTooltip";

type SelectProps = {
    onChange: (option: { target: { name: string; value: string } }) => void;
    options: { value: string | number; label: string }[];
    error?: string;
    help?: string;
    label: string;
    name: string;
    value?: string;
    disabled?: boolean;
};

export const Select = forwardRef<HTMLButtonElement, SelectProps>(
    ({ value, disabled, onChange, options, error, help, label, name, ...rest }, ref) => {
        return (
            <BaseSelect.Root
                disabled={disabled}
                value={value?.toString()}
                name={name}
                onValueChange={(value) => onChange({ target: { name, value: value.toString() } })}
            >
                <Box className={classes.header}>
                    <Text className={classes.inputLabel}>{label}</Text>
                    <RequirementsTooltip error={error} content={help} />
                </Box>

                <BaseSelect.Trigger ref={ref} {...rest} className={classes.trigger} />

                <BaseSelect.Content position="popper">
                    {options.map(({ value, label }) => (
                        <BaseSelect.Item key={value} value={value.toString()}>
                            {label}
                        </BaseSelect.Item>
                    ))}
                </BaseSelect.Content>
            </BaseSelect.Root>
        );
    }
);

Select.displayName = "Select";
