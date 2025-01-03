import { requestClient } from "@/lib/request/requestClient";
import { Menu } from "@/features/menu/types/Menu";

const GET_MENU_BY_CHILDREN_ENDPOINT = "/Meal/ByChild/:id";
const GET_MENU_BY_GROUP_ENDPOINT = "/Meal/ByGroup/:id";
const CREATE_MENU_ENDPOINT = "/Meal";
const EDIT_MENU_ENDPOINT = "/Meal/:id";

type AddMenuRequestBody = Omit<Menu, "id" | "date"> & { date: string };
type EditMenuRequestBody = Omit<Menu, "id" | "date"> & { date: string };

type MenuDto = {
    id: string;
    groupId: string;
    date: string;
    breakfast: string;
    lunch: string;
    dinner: string;
};

export class MenuService {
    public static async getByChildren(id: string, from: string, to: string): Promise<Menu[]> {
        const { data } = await requestClient.get<MenuDto[]>(
            GET_MENU_BY_CHILDREN_ENDPOINT.replace(":id", id).concat(`?DateFrom=${from}&DateTo=${to}`)
        );
        return data.map(MenuService.dtoToMenu);
    }

    public static async getByGroup(id: string, from: string, to: string): Promise<Menu[]> {
        const { data } = await requestClient.get<MenuDto[]>(
            GET_MENU_BY_GROUP_ENDPOINT.replace(":id", id).concat(`?DateFrom=${from}&DateTo=${to}`)
        );
        return data.map(MenuService.dtoToMenu);
    }

    public static async create(body: AddMenuRequestBody): Promise<void> {
        await requestClient.post(CREATE_MENU_ENDPOINT, body);
    }

    public static async update(body: EditMenuRequestBody, id: string): Promise<void> {
        await requestClient.put(EDIT_MENU_ENDPOINT.replace(":id", id), body);
    }

    public static async delete(id: string): Promise<void> {
        await requestClient.delete(EDIT_MENU_ENDPOINT.replace(":id", id));
    }

    private static dtoToMenu(dto: MenuDto): Menu {
        return {
            id: dto.id.toString(),
            groupId: dto.groupId.toString(),
            dinner: dto.dinner,
            lunch: dto.lunch,
            breakfast: dto.breakfast,
            date: dto.date,
        };
    }
}
