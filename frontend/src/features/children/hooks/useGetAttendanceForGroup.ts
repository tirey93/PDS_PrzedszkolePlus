import { useQuery } from "@tanstack/react-query";
import { ATTENDANCE_QUERY_KEY } from "@/features/children/constants/queryKeys";
import { AttendanceService } from "@/features/children/api/attendanceService";

type UseGetAttendanceForGroupOptions = {
    groupId?: string;
    from: string;
    to: string;
};

export const useGetAttendanceForGroup = ({ from, to, groupId }: UseGetAttendanceForGroupOptions) => {
    return useQuery({
        queryKey: [ATTENDANCE_QUERY_KEY, groupId, from, to],
        queryFn: () => AttendanceService.getForGroup(groupId ?? "", from, to),
        enabled: !!groupId,
    });
};
