import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MENU_QUERY_KEY } from "@/features/menu/constants/queryKeys";
import { MenuService } from "@/features/menu/api/menuService";

export const useDeleteMenu = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: MenuService.delete,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: [MENU_QUERY_KEY] }),
    });
};
