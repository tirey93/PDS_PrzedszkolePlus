import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
    MIN_PASSWORD_LENGTH,
    PASSWORD_CONFIRM_REQUIREMENT,
    PASSWORD_REQUIREMENT,
} from "@/features/users/constants/password";

export type ChangePasswordFormInputs = {
    oldPassword: string;
    newPassword: string;
    confirmNewPassword: string;
};

export const CURRENT_PASSWORD_REQUIREMENT = "Podaj aktualne hasło";

export const useChangePasswordForm = () => {
    const requirements = yup.object({
        oldPassword: yup.string().required(CURRENT_PASSWORD_REQUIREMENT),
        newPassword: yup.string().required(PASSWORD_REQUIREMENT).min(MIN_PASSWORD_LENGTH, PASSWORD_REQUIREMENT),
        confirmNewPassword: yup
            .string()
            .required(PASSWORD_CONFIRM_REQUIREMENT)
            .test("passwords-match", PASSWORD_CONFIRM_REQUIREMENT, function (value) {
                return this.parent.newPassword === value;
            }),
    });

    return useForm<ChangePasswordFormInputs>({
        resolver: yupResolver<ChangePasswordFormInputs>(requirements),
    });
};
