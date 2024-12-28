export type AttendanceState = "present" | "absent" | "unspecified";

export type Attendance = {
    id: string;
    childId: string;
    state: AttendanceState;
    date: string;
};
