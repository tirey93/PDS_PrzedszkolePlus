import { Box, IconButton } from "@radix-ui/themes";
import { CircleCheck, CircleHelp, CircleX } from "lucide-react";
import classes from "./CaretakerAttendanceCheck.module.scss";
import { AttendanceState } from "@/features/children/types/Attendance";

type AttendanceCheckProps = {
    state: AttendanceState;
    onChange: (state: AttendanceState) => void;
};

export const CaretakerAttendanceCheck = ({ state, onChange }: AttendanceCheckProps) => {
    return (
        <Box className={classes.container}>
            <IconButton
                size="1"
                onClick={() => onChange("absent")}
                color={state === "present" ? "jade" : "gray"}
                variant="ghost"
            >
                <CircleCheck size={20} />
            </IconButton>
            <IconButton
                size="1"
                onClick={() => onChange("unspecified")}
                color={state === "absent" ? "crimson" : "gray"}
                variant="ghost"
            >
                <CircleX size={20} />
            </IconButton>
            <IconButton
                size="1"
                onClick={() => onChange("present")}
                color={state === "unspecified" ? "purple" : "gray"}
                variant="ghost"
            >
                <CircleHelp size={20} />
            </IconButton>
        </Box>
    );
};
