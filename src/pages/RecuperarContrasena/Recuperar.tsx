import { IonButton, IonCol, IonContent, IonImg, IonInput, IonItem, IonLabel, IonPage, IonRow } from "@ionic/react"
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";

import LOGO from "../../assets/logo_intertenis.png";
import Footer from "../../components/Footer";

type RecuperarPasswordFormValues = {
    email: string
};

const RecuperarContrasenaPage: React.FC = () => {

    const history = useHistory();
    const { register, handleSubmit, formState: { errors }, clearErrors } = useForm<RecuperarPasswordFormValues>();

    const goToLogin = () => {
        history.push("/login");
        clearErrors();
    }

    const onSubmit = () => {

    }
    
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
                </IonContent>
                <Footer />
    </IonPage>)
}

export default RecuperarContrasenaPage