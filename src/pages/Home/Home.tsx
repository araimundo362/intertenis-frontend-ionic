import { IonCol, IonContent, IonHeader, IonImg, IonLoading, IonPage, IonRow } from "@ionic/react"
import { useContext, useEffect, useState } from "react";

import HomeButton from "../../components/HomeButton";
import { AuthContext } from "../../context/AuthContext";
import Footer from "../../components/Footer";
import { checkMyInscripcion } from "../../axios/inscripcion";
import { GlobalContext } from "../../context/GlobalContext";
import LOGO from "../../assets/logo_intertenis.png";

import "./Home.scss";

const HomePage: React.FC = () => {

    const [isLoading, ] = useState(false);

    const { userData, inscripcion, setInscripcion, setCategoria, setEquipo } = useContext(AuthContext);

    const { resultados } = useContext(GlobalContext);

    const makeBannerResultados = () => {
            let stringResultados = "";
            resultados.slice(0,8).forEach((result) => stringResultados += `${result.ganador} a ${result.perdedor} ${result.score}          `);

            return stringResultados;
    };

    useEffect(() => {
        makeBannerResultados();
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
                    <div className="marquee">
                        <pre>{makeBannerResultados()}</pre>
                    </div>
                    <IonRow className="row-margin">
                        <IonCol size="10" offset="1">
                            <HomeButton label="Posiciones" link="/posiciones" disabled={false}/>
                        </IonCol>
                    </IonRow>
                    <IonRow className="row-margin">
                        <IonCol size="10" offset="1">
                            <HomeButton label="Cargar Resultado" link="/cargar-resultado" disabled={!userData.isAdmin}/> 
                        </IonCol>
                    </IonRow>
                    <IonRow className="row-margin">
                        <IonCol size="10" offset="1">
                            <HomeButton label="Resultados" link="/resultados" />
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
                <Footer withBalls={false}/>
                </IonContent>
                <IonLoading
                        cssClass="my-custom-class"
                        isOpen={isLoading}
                        message={'Obteniendo datos...'}
                        />    
            </IonPage>
    )
}

export default HomePage;

//disabled={!inscripcion && !userData.isAdmin}