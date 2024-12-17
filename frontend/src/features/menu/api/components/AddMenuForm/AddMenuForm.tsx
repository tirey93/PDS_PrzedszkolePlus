import { Box, Button } from "@radix-ui/themes";
import classes from "./AddMenuForm.module.scss";

import { Input } from "@/components/Input/Input";

import { AddMenuFormInputs, useAddMenuForm } from "@/features/menu/api/components/AddMenuForm/hooks/useAddMenuForm";
import { Menu } from "@/features/menu/api/types/Menu";

type AddMenuFormProps = {
    onSubmit: (inputs: AddMenuFormInputs) => void;
    onCancel: () => void;
    initialValue?: Menu;
    isLoading?: boolean;
};

export const AddMenuForm = ({ onSubmit, isLoading, onCancel, initialValue }: AddMenuFormProps) => {
    const { register, handleSubmit, formState } = useAddMenuForm(initialValue);

    return (
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)} onReset={onCancel}>
            <Input {...register("breakfast")} label="Śniadanie" error={formState.errors?.breakfast?.message} />
            <Input {...register("lunch")} label="Lunch" error={formState.errors?.lunch?.message} />
            <Input {...register("dinner")} label="Podwieczorek" error={formState.errors?.dinner?.message} />

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
