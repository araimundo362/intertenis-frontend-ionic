import { IonCol, IonContent, IonHeader, IonImg, IonLoading, IonPage, IonRow } from "@ionic/react"
import { useContext, useEffect, useState } from "react";

import HomeButton from "../../components/HomeButton";
import { AuthContext } from "../../context/AuthContext";

import LOGO from "../../assets/logo_intertenis.png";
import "./Home.scss";
import Footer from "../../components/Footer";
import { checkMyInscripcion } from "../../axios/inscripcion";

const HomePage: React.FC = () => {

    const [isLoading, ] = useState(false);

    const { userData, inscripcion, setInscripcion, setCategoria, setEquipo } = useContext(AuthContext);

    useEffect(() => {
        if (!inscripcion) {
            checkMyInscripcion(userData._id).then((inscripcionStatus) => {
                setInscripcion(inscripcionStatus.inscripcion);
                setCategoria(inscripcionStatus.categoria);
                setEquipo(inscripcionStatus.equipo)
            });
        }
    }, [])// eslint-disable-line react-hooks/exhaustive-deps

    return (
            <IonPage>
                <IonHeader className="header">
                    <div className="header__container">
                        <h3 className="header__container__label">{`Hola ${userData.apodo}!`}</h3>
                        <IonImg src={LOGO} alt="Logo intertenis" className="header__container__img" />
                    </div>
                </IonHeader>
                <IonContent className="background-home">
                    <IonRow className="row-margin">
                        <IonCol size="10" offset="1">
                            <HomeButton label="Posiciones" link="/posiciones" disabled={false}/>
                        </IonCol>
                    </IonRow>
                    <IonRow className="row-margin">
                        <IonCol size="10" offset="1">
                            <HomeButton label="Cargar Resultado" link="/cargar-resultado" disabled={!inscripcion && !userData.isAdmin}/>
                        </IonCol>
                    </IonRow>
                    {!userData.isAdmin && !inscripcion && <IonRow className="row-margin">
                                            <IonCol size="10" offset="1">
                                                <HomeButton label="Inscripcion" link="/inscripcion" />
                                            </IonCol>
                                        </IonRow> } 
                    {userData.isAdmin && <IonRow className="row-margin">
                                            <IonCol size="10" offset="1">
                                                <HomeButton label="Pre-Inscripciones" link="/pre-inscripciones" disabled={false}/>
                                            </IonCol>
                                        </IonRow>}
                    {userData.isAdmin && <IonRow className="row-margin">
                            <IonCol size="10" offset="1">
                                <HomeButton label="Jugadores" link="/jugadores" disabled={false}/>
                            </IonCol>
                        </IonRow>}
                <IonRow className="row-title">
                    <IonCol size="12">
                        <h1 className="row-title__title">LA LIGA</h1>
                        <h4 className="row-title__subtitle">La original, la primera</h4>
                    </IonCol>
                </IonRow>
                </IonContent>
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