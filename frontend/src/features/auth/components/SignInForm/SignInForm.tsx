import classes from "./SignInForm.module.scss";
import { Button } from "@radix-ui/themes";
import {
    SIGN_IN_LOGIN_REQUIREMENT,
    SIGN_IN_PASSWORD_REQUIREMENT,
    SignInFormInputs,
    useSignInForm,
} from "@/features/auth/components/SignInForm/hooks/useSignInForm";
import { Input } from "@/components/Input/Input";

type SignInFormProps = {
    onSubmit: (payload: SignInFormInputs) => void;
    isLoading: boolean;
};

export const SignInForm = ({ onSubmit, isLoading }: SignInFormProps) => {
    const { register, handleSubmit, formState } = useSignInForm();

    return (
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
            <Input
                {...register("login")}
                label="Login"
                help={SIGN_IN_LOGIN_REQUIREMENT}
                error={formState.errors?.login?.message}
            />
            <Input
                {...register("password")}
                label="Hasło"
                type="password"
                help={SIGN_IN_PASSWORD_REQUIREMENT}
                error={formState.errors?.password?.message}
            />
            <Button loading={isLoading} className={classes.submitButton}>
                Zaloguj
            </Button>
        </form>
    );
};
