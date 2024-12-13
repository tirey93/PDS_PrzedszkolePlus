import { Box, Button } from "@radix-ui/themes";
import classes from "./AddUserForm.module.scss";
import {
    AddUserFormInputs,
    FIRST_NAME_REQUIREMENT,
    LAST_NAME_REQUIREMENT,
    LOGIN_REQUIREMENT,
    PASSWORD_CONFIRM_REQUIREMENT,
    PASSWORD_REQUIREMENT,
    useAddUserForm,
} from "@/features/users/components/AddUserForm/hooks/useAddUserForm";
import { Input } from "@/components/Input/Input";

type AddUserFormProps = {
    onSubmit: (inputs: AddUserFormInputs) => void;
    isLoading?: boolean;
};

export const AddUserForm = ({ onSubmit, isLoading }: AddUserFormProps) => {
    const { register, handleSubmit, formState } = useAddUserForm();

    return (
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
            <Box className={classes.row}>
                <Input
                    {...register("firstName")}
                    label="Imię"
                    error={formState.errors?.firstName?.message}
                    help={FIRST_NAME_REQUIREMENT}
                />
                <Input
                    {...register("lastName")}
                    label="Nazwisko"
                    error={formState.errors?.lastName?.message}
                    help={LAST_NAME_REQUIREMENT}
                />
            </Box>

            <Input
                {...register("login")}
                label="Login"
                error={formState.errors?.login?.message}
                help={LOGIN_REQUIREMENT}
            />

            <Box className={classes.row}>
                <Input
                    {...register("password")}
                    label="Hasło"
                    type="password"
                    error={formState.errors?.password?.message}
                    help={PASSWORD_REQUIREMENT}
                />
                <Input
                    {...register("confirmPassword")}
                    label="Potwierdź hasło"
                    type="password"
                    error={formState.errors?.confirmPassword?.message}
                    help={PASSWORD_CONFIRM_REQUIREMENT}
                />
            </Box>

            <Button color="jade" className={classes.submitButton} loading={isLoading}>
                Utwórz
            </Button>
        </form>
    );
};
