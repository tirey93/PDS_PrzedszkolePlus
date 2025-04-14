import { Box, Button } from "@radix-ui/themes";
import classes from "./CreateClassForm.module.scss";

import { Input } from "@/components/Input/Input";
import {
    CLASS_NAME_HELP,
    CreateClassFormInputs,
    useCreateClassForm,
} from "@/features/classes/components/CreateClassForm/hooks/useCreateClassForm.ts";

type CreateClassFormProps = {
    onSubmit: (inputs: CreateClassFormInputs) => void;
    onCancel: () => void;
    isLoading?: boolean;
};

export const CreateClassForm = ({ onSubmit, isLoading, onCancel }: CreateClassFormProps) => {
    const { register, handleSubmit, formState } = useCreateClassForm();

    return (
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)} onReset={onCancel}>
            <Input
                {...register("name")}
                label="Nazwa klasy"
                error={formState.errors?.name?.message}
                help={CLASS_NAME_HELP}
            />

            <Box className={classes.actions}>
                <Button variant="soft" type="reset">
                    Anuluj
                </Button>
                <Button color="jade" loading={isLoading} type="submit">
                    Utwórz
                </Button>
            </Box>
        </form>
    );
};
