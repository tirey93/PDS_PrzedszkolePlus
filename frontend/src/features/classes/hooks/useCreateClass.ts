import { useMutation } from "@tanstack/react-query";
import { ClassesService } from "@/features/classes/api/classesService.ts";
import { QueryKey, useInvalidateQuery } from "@/lib/apiClient";

export const useCreateClass = () => {
    const { invalidate } = useInvalidateQuery();

    return useMutation({
        mutationFn: ClassesService.create,
        onSuccess: async () => {
            void invalidate(QueryKey.Classes);
        },
    });
};
