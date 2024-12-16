import { requestClient } from "@/lib/request/requestClient";

const REPORT_ABSENCE_ENDPOINT = "/Attendance/Report";

type ReportAbsenceRequestBody = {
    childId: string;
    date: string;
};

export class AttendanceService {
    public static async reportAbsence(body: ReportAbsenceRequestBody): Promise<void> {
        await requestClient.post(REPORT_ABSENCE_ENDPOINT, body);
    }
}
