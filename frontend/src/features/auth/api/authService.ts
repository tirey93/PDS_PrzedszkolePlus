import { User, UserDTO } from "@/types/User";
import { requestClient } from "@/lib/request/requestClient";

const SIGN_IN_ENDPOINT = "/Authentication/Login";
const GET_MYSELF_ENDPOINT = "/User/LoggedIn";

type SignInRequestBody = {
    username: string;
    password: string;
};

export class AuthService {
    public static async signIn(body: SignInRequestBody): Promise<User> {
        const { data } = await requestClient.post<UserDTO>(SIGN_IN_ENDPOINT, body);
        return AuthService.mapDtoToUser(data);
    }

    public static async getMyself(): Promise<User> {
        const { data } = await requestClient.get<UserDTO>(GET_MYSELF_ENDPOINT);
        return AuthService.mapDtoToUser(data);
    }

    private static mapDtoToUser({ displayName, role, name, id, isActive }: UserDTO): User {
        const [firstName, lastName] = displayName.split(" ");
        return { firstName, lastName, role, login: name, id, isActive };
    }
}
