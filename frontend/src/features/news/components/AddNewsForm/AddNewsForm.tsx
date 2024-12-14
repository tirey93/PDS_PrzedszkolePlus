import { Box, Button } from "@radix-ui/themes";
import classes from "./AddNewsForm.module.scss";

import { Input } from "@/components/Input/Input";
import {
    AddNewsFormInputs,
    CONTENT_REQUIREMENT,
    TITLE_REQUIREMENT,
    useAddNewsForm,
} from "@/features/news/components/AddNewsForm/hooks/useAddNewsForm";

type AddNewsFormProps = {
    onSubmit: (inputs: AddNewsFormInputs) => void;
    onCancel: () => void;
    isLoading?: boolean;
};

export const AddNewsForm = ({ onSubmit, isLoading, onCancel }: AddNewsFormProps) => {
    const { register, handleSubmit, formState } = useAddNewsForm();

    return (
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)} onReset={onCancel}>
            <Input
                {...register("title")}
                label="Tytuł"
                error={formState.errors?.title?.message}
                help={TITLE_REQUIREMENT}
            />

            <Input
                {...register("content")}
                label="Treść ogłoszenia"
                type="textarea"
                error={formState.errors?.content?.message}
                help={CONTENT_REQUIREMENT}
            />

            <Input
                {...register("url")}
                label="URL do zdjęcia"
                error={formState.errors?.url?.message}
                help={TITLE_REQUIREMENT}
            />

            <Box className={classes.actions}>
                <Button variant="soft" type="reset">
                    Anuluj
                </Button>
                <Button color="jade" loading={isLoading} type="submit">
                    Zapisz
                </Button>
            </Box>
        </form>
    );
};
