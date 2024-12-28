import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

export type AddNewsFormInputs = {
    title: string;
    content: string;
    url: string;
};

export const TITLE_REQUIREMENT = "Minimum 10 znaków";
export const CONTENT_REQUIREMENT = "Minimum 50 znaków";
export const IMAGE_REQUIREMENT = "Link do zdjęcia jest wymagany";

export const useAddNewsForm = (initialValues?: AddNewsFormInputs) => {
    const requirements = yup.object({
        title: yup.string().required(TITLE_REQUIREMENT).min(10, TITLE_REQUIREMENT),
        content: yup.string().required(CONTENT_REQUIREMENT).min(50, CONTENT_REQUIREMENT),
        url: yup.string().required(IMAGE_REQUIREMENT).url(IMAGE_REQUIREMENT),
    });

    return useForm<AddNewsFormInputs>({
        resolver: yupResolver<AddNewsFormInputs>(requirements),
        defaultValues: initialValues,
    });
};
