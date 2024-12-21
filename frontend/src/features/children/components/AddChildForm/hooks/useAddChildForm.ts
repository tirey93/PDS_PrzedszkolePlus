import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

export type AddChildFormInputs = {
    firstName: string;
    lastName: string;
    groupId: string;
    parentId: string;
    dateOfBirth: Date;
};

export const CHILD_FIRST_NAME_HELP = "Imię jest wymagane";
export const CHILD_LAST_NAME_HELP = "Nazwisko jest wymagane";
export const CHILD_PARENT_HELP = "Rodzic musi być przypisany";
export const CHILD_GROUP_HELP = "Grupa musi być przypisana";
export const CHILD_BIRTHDATE_HELP = "Data urodzenia jest wymagana";

export const useAddChildForm = (initialValue?: Partial<AddChildFormInputs>) => {
    const requirements = yup.object({
        firstName: yup.string().required(CHILD_FIRST_NAME_HELP),
        lastName: yup.string().required(CHILD_LAST_NAME_HELP),
        groupId: yup.string().required(CHILD_GROUP_HELP),
        parentId: yup.string().required(CHILD_PARENT_HELP),
        dateOfBirth: yup.date().required(CHILD_BIRTHDATE_HELP),
    });

    return useForm<AddChildFormInputs>({
        resolver: yupResolver<AddChildFormInputs>(requirements),
        defaultValues: initialValue,
    });
};
