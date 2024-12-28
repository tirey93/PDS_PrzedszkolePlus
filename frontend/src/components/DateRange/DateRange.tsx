import { Badge, Box, IconButton, Text } from "@radix-ui/themes";
import { ChevronLeft, ChevronRight, TimerReset } from "lucide-react";
import classes from "./DateRange.module.scss";

type DateRangeProps = {
    start: string;
    end?: string;
    onNext: () => void;
    onPrevious: () => void;
    onReset: () => void;
};

export const DateRange = ({ start, end, onNext, onPrevious, onReset }: DateRangeProps) => {
    return (
        <Box className={classes.container}>
            <Badge color="gray" size="2" variant="surface" highContrast>
                <Text className={classes.date}>{start}</Text>
                {end && <Text className={classes.date}> - {end}</Text>}
            </Badge>

            <Box className={classes.buttons}>
                <IconButton size="1" variant="soft" color="blue" onClick={onPrevious}>
                    <ChevronLeft size={20} />
                </IconButton>
                <IconButton size="1" variant="soft" color="blue" onClick={onReset}>
                    <TimerReset size={20} />
                </IconButton>
                <IconButton size="1" variant="soft" color="blue" onClick={onNext}>
                    <ChevronRight size={20} />
                </IconButton>
            </Box>
        </Box>
    );
};
