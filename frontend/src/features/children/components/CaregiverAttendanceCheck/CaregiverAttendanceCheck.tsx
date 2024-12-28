import { Box, IconButton } from "@radix-ui/themes";
import { CircleCheck, CircleX } from "lucide-react";
import classes from "./CaregiversAttendanceCheck.module.scss";
import { AttendanceState } from "@/features/children/types/Attendance";
import { useReportAttendance } from "@/features/children/hooks/useReportAttendance";
import { toast } from "sonner";

type AttendanceCheckProps = {
    state: AttendanceState;
    childId: string;
    date: string;
};

export const CaregiverAttendanceCheck = ({ state, childId, date }: AttendanceCheckProps) => {
    const { mutateAsync, isPending } = useReportAttendance();

    const onChange = async (newValue: boolean) => {
        try {
            await mutateAsync({ status: newValue, childId, date });
        } catch (e) {
            toast.error("Nie udało się zarejestrować obecności.");
        }
    };

    return (
        <Box className={classes.container}>
            <IconButton
                loading={isPending}
                size="1"
                onClick={() => onChange(true)}
                color={state === "present" ? "jade" : "gray"}
                variant="ghost"
            >
                <CircleCheck size={20} />
            </IconButton>
            <IconButton
                loading={isPending}
                size="1"
                onClick={() => onChange(false)}
                color={state === "absent" ? "crimson" : "gray"}
                variant="ghost"
            >
                <CircleX size={20} />
            </IconButton>
        </Box>
    );
};
