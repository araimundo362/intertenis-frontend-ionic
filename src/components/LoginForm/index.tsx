import { IonButton, IonCol, IonInput, IonItem, IonLabel, IonRow } from "@ionic/react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";

import "./LoginForm.scss";
import { useAuth } from "../../hooks/useAuth";
import { OK, USER_NOT_FOUND, WRONG_PASSWORD } from "../../constants/constants";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export type LoginFormValues = {
    user: string,
    password: string
}

const LoginForm: React.FC = () => {

    const history = useHistory();
    const { register, handleSubmit, formState: { errors }, setError, reset } = useForm<LoginFormValues>({
        defaultValues: {
            user: "",
            password: ""
        }
    });
    const { login } = useAuth();
    const { setIsLoggedIn } = useContext(AuthContext);

    const goToForgotPassword = () => {
        history.push("/recuperar-password");
        reset();
    };

    const goToRegisterPage = () => {
        history.push("/register");
    }
    
    const onLogin = async (data: LoginFormValues) => {
        const loginResponse = await login(data.user, data.password);

        switch (loginResponse) {
            case OK:
                setIsLoggedIn(true);
                history.push("/home");
                break;
            case USER_NOT_FOUND:
                setError("password", {type: "custom", message: "El usuario o contraseña ingresados no es correcta"});
                break;
            case WRONG_PASSWORD:
                setError("password", {type: "custom", message: "El usuario o contraseña ingresados no es correcta"});
                break;
    }
}
    return (<form className="row-width-form" onSubmit={handleSubmit(onLogin)}>
                    <IonRow>
                        <IonCol size="10" offset="1">
                            <IonItem fill="solid" className="login-inputs">
                                <IonLabel position="floating">Email*</IonLabel>
                                <IonInput {...register("user", { required: true })} placeholder="Ingresa el mail" autocomplete="email" autofocus></IonInput>
                            </IonItem>
                            <div className="error-message" style={errors.user ? { opacity: 1 } : undefined}>
                                {errors.user?.type === 'required' && <p role="alert" className="error-alert">Debe ingresar un email</p>}
                            </div>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol size="10" offset="1">
                            <IonItem fill="solid" className="login-inputs">
                                <IonLabel position="floating">Contrasena*</IonLabel>
                                <IonInput {...register("password", { required: true })} type="password" placeholder="Ingresa la contrasena" autofocus autocomplete="current-password"></IonInput>
                            </IonItem>
                            <div className="error-message" style={errors.password ? { opacity: 1 } : undefined}>
                                {errors.password?.type === 'required' && <p role="alert" className="error-alert">Debe ingresar su contrasena</p>}
                                {errors.password && <p role="alert" className="error-alert">{errors.password.message}</p>}
                            </div>
                            <div className="forgot-password-container">
                                <span className="forgot-password-container__forgot-label" onClick={goToForgotPassword}>Cambiar contraseña</span>
                            </div>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol size="12" className="submit-column">
                            <IonButton type="submit" className="login-page-buttons">
                                        Iniciar sesión
                            </IonButton>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol size="12" className="submit-column">
                            <IonButton className="login-page-buttons" fill="outline" onClick={goToRegisterPage}>
                                Registrate
                            </IonButton>
                        </IonCol>    
                    </IonRow> 
                </form>
    )
};

export default LoginForm;