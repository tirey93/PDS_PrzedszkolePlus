import { User, UserRole } from "@/types/User";
import { requestClient } from "@/lib/request/requestClient";

type UserDTO = {
    id: string;
    displayName: string;
    name: string;
    role: UserRole;
    isActive: boolean;
};

type SignInRequestBody = {
    username: string;
    password: string;
};

type SignUpRequestBody = {
    username: string;
    password: string;
    firstName: string;
    lastName: string;
};

export class AuthService {
    public static async signIn(body: SignInRequestBody): Promise<User> {
        const { data } = await requestClient.post<UserDTO>("/Authentication/Login", body);
        return AuthService.mapDtoToUser(data);
    }

    public static async signUp(body: SignUpRequestBody): Promise<User> {
        const { data } = await requestClient.post<UserDTO>("Authentication/Register", body);
        return AuthService.mapDtoToUser(data);
    }

    public static async logOut(): Promise<void> {
        await requestClient.post("/Authentication/Logout");
    }

    public static async getMyself(): Promise<User> {
        const { data } = await requestClient.get<UserDTO>("/User/LoggedIn");
        return AuthService.mapDtoToUser(data);
    }

    private static mapDtoToUser({ displayName, role, name, id, isActive }: UserDTO): User {
        const [firstName, lastName] = displayName.split(" ");
        return { firstName, lastName, role, login: name, id: id.toString(), isActive };
    }
}
