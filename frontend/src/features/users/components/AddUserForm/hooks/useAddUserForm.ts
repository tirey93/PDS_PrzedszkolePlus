import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

export type AddUserFormInputs = {
    login: string;
    password: string;
    confirmPassword: string;
    lastName: string;
    firstName: string;
};

export const PASSWORD_REQUIREMENT = "Hasło musi zawierać co najmniej 8 znaków";
export const PASSWORD_CONFIRM_REQUIREMENT = "Hasła muszą się zgadzać";
export const FIRST_NAME_REQUIREMENT = "Minimum 3 znaki, białe znaki są niedozwolone";
export const LAST_NAME_REQUIREMENT = "Minimum 3 znaki, białe znaki są niedozwolone";
export const LOGIN_REQUIREMENT = "Minimum 6 znaków, białe znaki są niedozwolone";

export const useAddUserForm = () => {
    const requirements = yup.object({
        password: yup.string().required(PASSWORD_REQUIREMENT).min(8, PASSWORD_REQUIREMENT),
        confirmPassword: yup
            .string()
            .required(PASSWORD_CONFIRM_REQUIREMENT)
            .test("passwords-match", PASSWORD_CONFIRM_REQUIREMENT, function (value) {
                return this.parent.password === value;
            }),
        firstName: yup
            .string()
            .required(FIRST_NAME_REQUIREMENT)
            .min(3, FIRST_NAME_REQUIREMENT)
            .test("whitespace_validation", FIRST_NAME_REQUIREMENT, (value) => !/\s/.test(value)),
        lastName: yup
            .string()
            .required(LAST_NAME_REQUIREMENT)
            .min(3, LAST_NAME_REQUIREMENT)
            .test("whitespace_validation", LAST_NAME_REQUIREMENT, (value) => !/\s/.test(value)),
        login: yup
            .string()
            .required(LOGIN_REQUIREMENT)
            .min(6, LOGIN_REQUIREMENT)
            .test("whitespace_validation", LOGIN_REQUIREMENT, (value) => !/\s/.test(value)),
    });

    return useForm<AddUserFormInputs>({
        resolver: yupResolver<AddUserFormInputs>(requirements),
    });
};
