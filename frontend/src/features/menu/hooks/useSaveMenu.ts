import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MENU_QUERY_KEY } from "@/features/menu/constants/queryKeys";
import { MenuService } from "@/features/menu/api/menuService";
import { Menu } from "@/features/menu/types/Menu";

type SaveMenuOptions = Omit<Menu, "id"> & { id?: string };

const saveMenu = async (menu: SaveMenuOptions): Promise<void> => {
    if (menu.id) {
        return MenuService.update({ ...menu, id: menu.id, date: menu.date.toISOString() });
    } else {
        return MenuService.create({ ...menu, date: menu.date.toISOString() });
    }
};

export const useSaveMenu = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: saveMenu,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: [MENU_QUERY_KEY] }),
    });
};