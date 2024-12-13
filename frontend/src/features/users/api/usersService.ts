import { requestClient } from "@/lib/request/requestClient";
import { UserRole } from "@/types/User";

const CREATE_USER_ENDPOINT = "/Authentication/Register";

type CreateUserRequestBody = {
    username: string;
    password: string;
    role: UserRole;
    displayName: string;
};

export class UsersService {
    public static async create(body: CreateUserRequestBody): Promise<void> {
        await requestClient.post(CREATE_USER_ENDPOINT, body);
    }
}
