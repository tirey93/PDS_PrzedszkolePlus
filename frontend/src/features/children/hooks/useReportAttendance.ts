import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ATTENDANCE_QUERY_KEY } from "@/features/children/constants/queryKeys";
import { AttendanceService } from "@/features/children/api/attendanceService";

export const useReportAttendance = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: AttendanceService.reportAttendance,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: [ATTENDANCE_QUERY_KEY] }),
    });
};
