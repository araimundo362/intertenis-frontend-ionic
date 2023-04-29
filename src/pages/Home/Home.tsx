import { IonButton, IonCol, IonContent, IonFooter, IonGrid, IonHeader, IonImg, IonItem, IonLabel, IonLoading, IonMenu, IonPage, IonRow, IonTitle, IonToolbar } from "@ionic/react"
import { useContext, useEffect, useState } from "react";

import HomeButton from "../../components/HomeButton";
import { useStorage } from "../../hooks/useStorage";
import { AuthContext } from "../../context/AuthContext";

import RED from "../../assets/Red_.jpg";
import LOGO from "../../assets/logo_intertenis.png";
import "./Home.scss";
import Footer from "../../components/Footer";
// Paso siguiente: Cuando nos loggeamos, pedimos los datos personales y los guardamos en un contexto. Despues, los pedimos
const HomePage: React.FC = () => {

    const [isLoading, setIsLoading] = useState(false);

    const { userData, inscripcion } = useContext(AuthContext);

    console.log("veo userData en Home", userData);

    return (
            <IonPage>
                <IonHeader className="header">
                    <div className="header__container">
                        <h3 className="header__container__label">{`Hola ${userData.apodo}!`}</h3>
                        <IonImg src={LOGO} alt="Logo intertenis" className="header__container__img" />
                    </div>
                </IonHeader>
                <IonContent>
                    <IonRow className="row-margin">
                        <IonCol size="10" offset="1">
                            <HomeButton label="Posiciones" link="/posiciones" disabled={false}/>
                        </IonCol>
                    </IonRow>
                    <IonRow className="row-margin">
                        <IonCol size="10" offset="1">
                            <HomeButton label="Cargar Resultado" link="/cargar-resultado" disabled={!userData.isAdmin && !inscripcion} />
                        </IonCol>
                    </IonRow>
                    <IonRow className="row-margin">
                        <IonCol size="10" offset="1">
                            <HomeButton label="Inscripcion" link="/inscripcion" disabled={false}/>
                        </IonCol>
                    </IonRow>
                </IonContent>
                <IonRow className="row-title">
                    <IonCol size="8" offset="2">
                        <h1 className="row-title__title">LA LIGA</h1>
                    </IonCol>
                </IonRow>
                <Footer withBalls={false} />
                <IonLoading
                        cssClass="my-custom-class"
                        isOpen={isLoading}
                        message={'Obteniendo datos...'}
                        />    
            </IonPage>
    )
}

export default HomePage;