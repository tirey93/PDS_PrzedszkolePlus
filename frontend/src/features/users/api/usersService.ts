import { requestClient } from "@/lib/request/requestClient";
import { User, UserDTO, UserRole } from "@/types/User";

const GET_ALL_USERS_ENDPOINT = "/User";
const CREATE_USER_ENDPOINT = "/Authentication/Register";
const DISABLE_OR_ENABLE_USER_ENDPOINT = "/User/{id}/IsActive";
const CHANGE_PASSWORD_ENDPOINT = "/User/{id}/Password";
const GET_USERS_BY_ROLE_ENDPOINT = "/User/ByRole";

type CreateUserRequestBody = {
    username: string;
    password: string;
    role: UserRole;
    displayName: string;
};

export type ChangePasswordRequestBody = {
    oldPassword: string;
    newPassword: string;
};

export class UsersService {
    public static async getAll(): Promise<User[]> {
        const { data } = await requestClient.get<UserDTO[]>(GET_ALL_USERS_ENDPOINT);
        return data.map(UsersService.mapDtoToUser);
    }

    public static async getByRole(role: UserRole): Promise<User[]> {
        const { data } = await requestClient.get<UserDTO[]>(
            GET_USERS_BY_ROLE_ENDPOINT.concat("?UserRole=").concat(role)
        );
        return data.map(UsersService.mapDtoToUser);
    }

    public static async createOne(body: CreateUserRequestBody): Promise<void> {
        await requestClient.post(CREATE_USER_ENDPOINT, body);
    }

    public static async changePassword(body: ChangePasswordRequestBody, userId: string): Promise<void> {
        await requestClient.put(CHANGE_PASSWORD_ENDPOINT.replace("{id}", userId), body);
    }

    public static async disableOne(userId: string): Promise<void> {
        await UsersService.changeIsActive(userId, false);
    }

    public static async enableOne(userId: string): Promise<void> {
        await UsersService.changeIsActive(userId, true);
    }

    private static changeIsActive(userId: string, isActive: boolean): Promise<void> {
        return requestClient.put(DISABLE_OR_ENABLE_USER_ENDPOINT.replace("{id}", userId).concat(`?value=${isActive}`));
    }

    private static mapDtoToUser({ displayName, role, name, id, isActive }: UserDTO): User {
        const [firstName, lastName] = displayName.split(" ");
        return { firstName, lastName, role, login: name, id: id.toString(), isActive };
    }
}
