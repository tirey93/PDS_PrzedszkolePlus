import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

export type SignInFormInputs = { login: string; password: string };

export const useSignInForm = () => {
    const requirements = yup.object({
        password: yup.string().required("Hasło jest wymagane."),
        login: yup
            .string()
            .required("Login jest wymagany.")
            .test("whitespace_validation", "Login nie może zawierać białych znaków.", (value) => !/\s/.test(value)),
    });

    return useForm<SignInFormInputs>({
        resolver: yupResolver<SignInFormInputs>(requirements),
    });
};
