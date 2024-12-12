import classes from "./SignInForm.module.scss";
import { Button, Text, TextField } from "@radix-ui/themes";
import { SignInFormInputs, useSignInForm } from "@/features/auth/components/SignInForm/hooks/useSignInForm";

type SignInFormProps = {
    onSubmit: (payload: SignInFormInputs) => void;
    isLoading: boolean;
};

export const SignInForm = ({ onSubmit, isLoading }: SignInFormProps) => {
    const { register, handleSubmit, formState } = useSignInForm();

    return (
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={classes.input}>
                <Text className={classes.inputLabel}>Login</Text>
                <TextField.Root {...register("login")} />
                {formState.errors.login && <Text className={classes.inputError}>{formState.errors.login.message}</Text>}
            </div>

            <div className={classes.input}>
                <Text className={classes.inputLabel}>Hasło</Text>
                <TextField.Root {...register("password")} type="password" />
                {formState.errors.password && (
                    <Text className={classes.inputError}>{formState.errors.password.message}</Text>
                )}
            </div>

            <Button loading={isLoading} className={classes.submitButton}>
                Zaloguj
            </Button>
        </form>
    );
};
