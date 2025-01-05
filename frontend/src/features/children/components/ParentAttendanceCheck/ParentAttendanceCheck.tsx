import { Badge, Box, Button } from "@radix-ui/themes";
import { CircleCheck, CircleHelp, CircleX } from "lucide-react";
import classes from "./ParentAttendanceCheck.module.scss";
import { AttendanceState } from "@/features/children/types/Attendance";
import { ReportAbsenceDialog } from "@/features/children/components/ReportAbsenceDialog/ReportAbsenceDialog";

type ParentAttendanceCheckProps = {
    state: AttendanceState;
    childId: string;
    date: Date;
};

export const ParentAttendanceCheck = ({ state, childId, date }: ParentAttendanceCheckProps) => {
    if (state === "present") {
        return (
            <Badge size="1" color="jade">
                <CircleCheck size={20} />
            </Badge>
        );
    }

    if (state === "absent") {
        return (
            <Badge size="1" color="crimson">
                <CircleX size={20} />
            </Badge>
        );
    }

    return (
        <Box className={classes.container}>
            <ReportAbsenceDialog
                date={date}
                childId={childId}
                trigger={
                    <Button className={classes.reportAbsenceButton} variant="soft" size="1">
                        <CircleHelp size={20} />
                        Zgłoś
                    </Button>
                }
            />
        </Box>
    );
};
