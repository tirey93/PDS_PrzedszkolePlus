import { User, UserDTO } from "@/types/User";

// const SIGN_IN_ENDPOINT = "/Authentication/Login";

type SignInRequestBody = {
    username: string;
    password: string;
};

export class AuthService {
    public static async signIn(body: SignInRequestBody): Promise<User> {
        // TODO: Restore it
        // const { data } = await requestClient.post<UserDTO>(SIGN_IN_ENDPOINT, body);
        // return AuthService.mapDtoToUser(data);

        return AuthService.mapDtoToUser({
            displayName: "Jan Kowalski",
            role: "Caretaker",
            username: body.username,
            id: "1",
            isActive: true,
        });
    }

    private static mapDtoToUser({ displayName, role, username, id, isActive }: UserDTO): User {
        const [firstName, lastName] = displayName.split(" ");
        return { firstName, lastName, role, login: username, id, isActive };
    }
}
