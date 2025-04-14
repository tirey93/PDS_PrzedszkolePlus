import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CLASS_NAME_HELP } from "@/features/classes/components/CreateClassForm/hooks/useCreateClassForm.ts";

export type CreateFundraiserFormInputs = {
    name: string;
    description: string;
    amountPerPerson: number;
    startDate: Date;
    endDate: Date;
    classId: number;
};

export const FUNDRAISER_NAME_HELP = "Wymagane min. 10 znaków";
export const FUNDRAISER_DESCRIPTION_HELP = "Wymagane min. 50 znaków";
export const FUNDRAISER_AMOUNT_PER_PERSON_HELP = "Zbierana kwota od osoby jest wymagana.";
export const FUNDRAISER_START_DATE_HELP = "Data rozpoczęcia zbiórki jest wymagana.";
export const FUNDRAISER_END_DATE_HELP = "Data zakończenia zbiórki jest wymagana.";
export const FUNDRAISER_CLASS_HELP = "Zbiórka musi być przypisana do klasy.";

export const useCreateFundraiserForm = () => {
    const requirements = yup.object({
        name: yup.string().required(CLASS_NAME_HELP).min(10, FUNDRAISER_NAME_HELP),
        description: yup.string().required(CLASS_NAME_HELP).min(50, FUNDRAISER_DESCRIPTION_HELP),
        amountPerPerson: yup.number().required(CLASS_NAME_HELP),
        startDate: yup.date().required(CLASS_NAME_HELP),
        endDate: yup.date().required(CLASS_NAME_HELP),
        classId: yup.number().required(CLASS_NAME_HELP),
    });

    return useForm<CreateFundraiserFormInputs>({
        resolver: yupResolver<CreateFundraiserFormInputs>(requirements),
    });
};
