import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

export type SendMessageFormInputs = {
    content: string;
};

export const useMessageForm = () => {
    const requirements = yup.object({
        content: yup.string().required(),
    });

    return useForm<SendMessageFormInputs>({
        resolver: yupResolver<SendMessageFormInputs>(requirements),
    });
};
