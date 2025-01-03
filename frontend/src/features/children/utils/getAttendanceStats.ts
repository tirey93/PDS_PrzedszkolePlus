import { Attendance } from "@/features/children/types/Attendance";
import dayjs from "dayjs";
import { formatISODate } from "@/utils/dateFormat";

export const getAttendanceStats = (entries: Attendance[]) => {
    const now = dayjs();

    const totalAttendanceEntriesToday = entries.filter((att) => att.date === formatISODate(now));
    const averageAttendanceInPast = calculateAttendance(entries);
    const averageAttendanceToday = calculateAttendance(totalAttendanceEntriesToday);
    const trend = averageAttendanceToday - averageAttendanceInPast;

    return { averageAttendanceInPast, averageAttendanceToday, trend };
};

const calculateAttendance = (entries: Attendance[]) => {
    if (!entries.length) {
        return 0;
    }

    return Math.round((entries.filter((entry) => entry.state === "present").length / entries.length) * 100);
};
