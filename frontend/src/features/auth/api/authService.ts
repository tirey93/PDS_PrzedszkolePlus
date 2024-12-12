import { requestClient } from "@/lib/request/requestClient";
import { User, UserRole } from "@/features/auth/types/User";

const SIGN_IN_ENDPOINT = "/Authentication/Login";

type SignInRequestBody = {
    username: string;
    password: string;
};

type UserDTO = {
    displayName: string;
    username: string;
    role: UserRole;
};

export class AuthService {
    public static async signIn(body: SignInRequestBody): Promise<User> {
        const { data } = await requestClient.post<UserDTO>(SIGN_IN_ENDPOINT, body);
        return this.mapDtoToUser(data);
    }

    private static mapDtoToUser({ displayName, role, username }: UserDTO): User {
        const [firstName, lastName] = displayName.split(" ");
        return { firstName, lastName, role, login: username };
    }
}
