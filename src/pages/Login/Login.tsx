import { IonCol, IonContent, IonImg, IonLoading, IonPage, IonRow } from "@ionic/react";

import LoginForm from "../../components/LoginForm";
import LOGO from "../../assets/logo_intertenis.png";

import "./Login.scss";
import { useAuth } from "../../hooks/useAuth";
import Footer from "../../components/Footer";

const LoginPage: React.FC = () => {

    const { isLoading } = useAuth();

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