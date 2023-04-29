import { IonButton, IonCol, IonContent, IonFooter, IonImg, IonLoading, IonPage, IonRow } from "@ionic/react";
import { useHistory } from "react-router-dom";

import LoginForm, { LoginFormValues } from "../../components/LoginForm";
import TennisBallComponent from "../../components/TennisBall";

import LOGO from "../../assets/logo_intertenis.png";
import RED from "../../assets/Red_.jpg";

import "./Login.scss";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { OK, USER_NOT_FOUND } from "../../constants/constants";
import { useForm, FormProvider } from "react-hook-form";
import { useMobile } from "../../hooks/useMobile";
import Footer from "../../components/Footer";

const LoginPage: React.FC = () => {

    const history = useHistory();
    const { isLoading, login } = useAuth();
    const methods = useForm();

    const isMobile = useMobile();

    // Necesitamos usar el FormContext de react-hook-form, de manera tal que podamos limpiar el formulario de login en caso de error
    return (<IonPage>
                <IonContent>
                    <IonRow className="logo-container">
                        <IonCol size="12">
                            <IonImg src={LOGO} alt="Logo intertenis" className="logo-img" />
                        </IonCol>
                    </IonRow>
                        <LoginForm />

                    <IonLoading
                        cssClass="my-custom-class"
                        isOpen={isLoading}
                        message={'Ingresando...'}
                        duration={5000}
                        />    
                </IonContent>
                <Footer />
            </IonPage>)

}

export default LoginPage;