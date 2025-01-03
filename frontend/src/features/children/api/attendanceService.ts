import { requestClient } from "@/lib/request/requestClient";
import { Attendance } from "@/features/children/types/Attendance";

const REPORT_ATTENDANCE_ENDPOINT = "/Attendance";
const GET_ATTENDANCE_FOR_OWN_CHILDREN_ENDPOINT = "/Attendance/ByLoggedParent";
const GET_ATTENDANCE_FOR_GROUP_ENDPOINT = "/Attendance/ByGroup/:id";

type ReportAttendanceRequestBody = {
    childId: string;
    date: string;
    status: boolean;
};

type AttendanceDto = {
    id: number;
    childId: number;
    date: string;
    status: boolean;
};

export class AttendanceService {
    public static async getForOwnChildren(from: string, to: string): Promise<Attendance[]> {
        const { data } = await requestClient.get<AttendanceDto[]>(
            GET_ATTENDANCE_FOR_OWN_CHILDREN_ENDPOINT.concat(`?DateFrom=${from}&DateTo=${to}`)
        );
        return data.map(AttendanceService.mapDtoToAttendance);
    }

    public static async getForGroup(id: string, from: string, to: string): Promise<Attendance[]> {
        const { data } = await requestClient.get<AttendanceDto[]>(
            GET_ATTENDANCE_FOR_GROUP_ENDPOINT.replace(":id", id).concat(`?DateFrom=${from}&DateTo=${to}`)
        );
        return data.map(AttendanceService.mapDtoToAttendance);
    }

    public static async reportAttendance(body: ReportAttendanceRequestBody): Promise<void> {
        await requestClient.post(REPORT_ATTENDANCE_ENDPOINT, body);
    }

    private static mapDtoToAttendance(dto: AttendanceDto): Attendance {
        return {
            id: dto.id.toString(),
            date: dto.date,
            childId: dto.childId.toString(),
            state: dto.status ? "present" : "absent",
        };
    }
}
