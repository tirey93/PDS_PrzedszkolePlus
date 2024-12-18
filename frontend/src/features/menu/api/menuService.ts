import { requestClient } from "@/lib/request/requestClient";
import { Menu } from "@/features/menu/types/Menu";

const CREATE_MENU_ENDPOINT = "/Menu";
const EDIT_MENU_ENDPOINT = "/Menu/:id";

type AddMenuRequestBody = Omit<Menu, "id" | "date"> & { date: string };
type EditMenuRequestBody = Omit<Menu, "date"> & { date: string };

export class MenuService {
    public static async create(body: AddMenuRequestBody): Promise<void> {
        await requestClient.post(CREATE_MENU_ENDPOINT, body);
    }

    public static async update(body: EditMenuRequestBody): Promise<void> {
        await requestClient.post(EDIT_MENU_ENDPOINT, body);
    }
}
