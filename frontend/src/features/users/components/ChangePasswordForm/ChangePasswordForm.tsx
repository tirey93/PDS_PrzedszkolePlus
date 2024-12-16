import { Input } from "@/components/Input/Input";
import { Box, Button } from "@radix-ui/themes";

import classes from "./ChangePasswordForm.module.scss";
import {
    ChangePasswordFormInputs,
    CURRENT_PASSWORD_REQUIREMENT,
    useChangePasswordForm,
} from "@/features/users/components/ChangePasswordForm/hooks/useChangePasswordForm";
import { PASSWORD_CONFIRM_REQUIREMENT, PASSWORD_REQUIREMENT } from "@/features/users/constants/password";

type ChangePasswordFormProps = {
    onSubmit: (inputs: ChangePasswordFormInputs, clearForm: () => void) => void;
    isLoading: boolean;
};

export const ChangePasswordForm = ({ onSubmit, isLoading }: ChangePasswordFormProps) => {
    const { register, handleSubmit, formState, reset } = useChangePasswordForm();

    const internalOnSubmit = (inputs: ChangePasswordFormInputs) => {
        onSubmit(inputs, reset);
    };

    return (
        <form className={classes.form} onSubmit={handleSubmit(internalOnSubmit)}>
            <Input
                {...register("currentPassword")}
                label="Stare hasło"
                help={CURRENT_PASSWORD_REQUIREMENT}
                error={formState.errors?.currentPassword?.message}
                type="password"
            />
            <Input
                {...register("newPassword")}
                label="Nowe hasło"
                help={PASSWORD_REQUIREMENT}
                error={formState.errors?.newPassword?.message}
                type="password"
            />
            <Input
                {...register("confirmNewPassword")}
                label="Potwierdź nowe hasło"
                help={PASSWORD_CONFIRM_REQUIREMENT}
                error={formState.errors?.confirmNewPassword?.message}
                type="password"
            />
            <Box className={classes.actions}>
                <Button variant="soft" type="reset">
                    Anuluj
                </Button>
                <Button color="jade" variant="soft" type="submit" loading={isLoading}>
                    Zapisz
                </Button>
            </Box>
        </form>
    );
};
