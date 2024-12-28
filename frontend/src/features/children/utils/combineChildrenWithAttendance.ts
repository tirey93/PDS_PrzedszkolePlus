import { Child, ChildWithAttendance } from "@/features/children/types/Child";
import { Attendance } from "@/features/children/types/Attendance";

export const combineChildrenWithAttendance = (
    children: Child[],
    attendance: Attendance[],
    date: string
): ChildWithAttendance[] => {
    return children.map((child) => ({
        ...child,
        attendance: attendance.find((att) => att.childId === child.id && att.date === date) ?? { date },
    }));
};
