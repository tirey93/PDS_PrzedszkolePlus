import { useQuery } from "@tanstack/react-query";
import { ATTENDANCE_QUERY_KEY } from "@/features/children/constants/queryKeys";
import { AttendanceService } from "@/features/children/api/attendanceService";

type UseGetAttendanceForOwnChildrenOptions = {
    from: string;
    to: string;
};

export const useGetAttendanceForOwnChildren = ({ from, to }: UseGetAttendanceForOwnChildrenOptions) => {
    return useQuery({
        queryKey: [ATTENDANCE_QUERY_KEY, from, to],
        queryFn: () => AttendanceService.getForOwnChildren(from, to),
    });
};
