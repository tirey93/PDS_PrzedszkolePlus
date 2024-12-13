import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

export type SignInFormInputs = { login: string; password: string };

export const SIGN_IN_LOGIN_REQUIREMENT = "Login jest wymagany";
export const SIGN_IN_PASSWORD_REQUIREMENT = "Hasło jest wymagane";

export const useSignInForm = () => {
    const requirements = yup.object({
        password: yup.string().required(SIGN_IN_PASSWORD_REQUIREMENT),
        login: yup.string().required(SIGN_IN_LOGIN_REQUIREMENT),
    });

    return useForm<SignInFormInputs>({
        resolver: yupResolver<SignInFormInputs>(requirements),
    });
};
