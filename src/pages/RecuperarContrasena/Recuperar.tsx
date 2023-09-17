import { IonButton, IonCol, IonContent, IonImg, IonInput, IonItem, IonLabel, IonPage, IonRow } from "@ionic/react"
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";

import LOGO from "../../assets/logo_intertenis.png";
import Footer from "../../components/Footer";
import { changePassword } from "../../axios/auth";
import { OK } from "../../constants/constants";
import { useState } from "react";
import Alert from "../../components/Alert";

type RecuperarPasswordFormValues = {
    email: string;
    password: string;
};

const RecuperarContrasenaPage: React.FC = () => {

    const history = useHistory();
    const { register, handleSubmit, formState: { errors }, reset} = useForm<RecuperarPasswordFormValues>();

    const [successAlert, setSuccessAlert] = useState(false);
    const [errorAlert, setErrorAlert] = useState(false);

    const goToLogin = () => {
        history.push("/login");
        reset();
    }

    const onSubmit = async (data: RecuperarPasswordFormValues) => {
        const submitPassword = await changePassword(data.email, data.password);

        switch (submitPassword.status) {
            case OK: {
                setSuccessAlert(true);
                break;
            }
            default: {
                setErrorAlert(true);
                break;
            }
        }
    }
    
    const closeErrorAlert = () => setErrorAlert(false);
    return (<IonPage>
                <IonContent>
                    <IonRow className="logo-container">
                        <IonCol size="12">
                            <IonImg src={LOGO} alt="Logo intertenis" className="logo-img" />
                        </IonCol>
                    </IonRow>
                    <form onSubmit={handleSubmit(onSubmit)}>
                    <IonRow>
                        <IonCol size="10" offset="1">
                            <IonItem fill="solid" className="login-inputs">
                                <IonLabel position="floating">Email*</IonLabel>
                                <IonInput {...register("email", { required: true })} placeholder="Ingresa el mail"></IonInput>
                            </IonItem>
                            <div className="error-message" style={errors.email ? { opacity: 1 } : undefined}>
                                {errors.email?.type === 'required' && <p role="alert" className="error-alert">Debe ingresar un email</p>}
                            </div>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol size="10" offset="1">
                            <IonItem fill="solid" className="login-inputs">
                                <IonLabel position="floating">Nueva contraseña*</IonLabel>
                                <IonInput {...register("password", { required: true })} placeholder="Ingresa la nueva contraseña"></IonInput>
                            </IonItem>
                            <div className="error-message" style={errors.email ? { opacity: 1 } : undefined}>
                                {errors.password?.type === 'required' && <p role="alert" className="error-alert">Debe ingresar una contraseña</p>}
                            </div>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol size="12" className="submit-column">
                            <IonButton type="submit">
                                        Recuperar Contrasena
                            </IonButton>
                        </IonCol>
                    </IonRow>
                    </form>
                    <IonRow>
                        <IonCol size="12" className="submit-column">
                            <IonButton fill="outline" onClick={goToLogin}>
                                        Atras
                            </IonButton>
                        </IonCol>
                    </IonRow>

                    <Alert isOpen={successAlert} header="Perfecto!" message="Se ha cambiado su contrasena! No vuelvas a olvidarla !!" closeAlert={goToLogin} buttons={["Ok!"]}/>
                    <Alert isOpen={errorAlert} header="Ups!" message="Ocurrio un error! Volve a intentarlo mas tarde!" closeAlert={closeErrorAlert} buttons={["Ok!"]}/>
                </IonContent>
                <Footer />
    </IonPage>)
}

export default RecuperarContrasenaPage