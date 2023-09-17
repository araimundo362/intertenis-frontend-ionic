import { IonCard, IonCardContent, IonCardSubtitle, IonCol, IonContent, IonItem, IonPage, IonRow } from "@ionic/react"
import Header from "../../components/Header"
import { useHistory } from "react-router"
import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";

import "./ListaResultados.scss";
import { transformarResultado } from "../../utils/transformer";

const ListaResultadosPage: React.FC = () => {

    const history = useHistory();

    const { resultados } = useContext(GlobalContext);

    const goBack = () => {
        history.goBack();
    };

    return <IonPage>
        <Header label="Resultados" action={goBack} />
        <IonContent className="background-home">
            {transformarResultado(resultados).map((score, index) => <>
                <IonRow key={index} className="row-resultado-card">
                <IonCol size="11">
                    <IonCard className="resultado-card">
                        <IonCardSubtitle className="resultado-card__subtitle">{score.fecha}</IonCardSubtitle>
                        <IonCardContent className="resultado-card__no-padding">
                            <IonRow>
                                <IonCol className="resultado-card__no-padding">
                                    <IonItem className="resultado-card__item">
                                        <IonCol size="5"><h6 className="resultado-card__name resultado-card__name__winner">{score.bloqueGanador.ganador}</h6></IonCol>
                                        <IonCol offset="2" size="2" className={score.bloqueGanador.set1 < score.bloquePerdedor.set1 ? "resultado-card__name resultado-card__name__looser"  :"resultado-card__name resultado-card__name__winner"}> {score.bloqueGanador.set1}</IonCol>
                                        <IonCol size="2" className={score.bloqueGanador.set2 < score.bloquePerdedor.set2 ? "resultado-card__name resultado-card__name__looser"  :"resultado-card__name resultado-card__name__winner"}>{score.bloqueGanador.set2}</IonCol>
                                        {score.bloqueGanador.set3 && <IonCol size="2" className="resultado-card__name resultado-card__name__winner">{score.bloqueGanador.set3}</IonCol>}
                                    </IonItem>
                                </IonCol>
                            </IonRow>
                            <IonRow>
                                <IonCol className="resultado-card__no-padding">
                                    <IonItem className="resultado-card__item">
                                        <IonCol size="5"><h6 className="resultado-card__name resultado-card__name__looser">{score.bloquePerdedor.perdedor}</h6></IonCol>
                                        <IonCol offset="2" size="2" className={score.bloqueGanador.set1 < score.bloquePerdedor.set1 ?"resultado-card__name resultado-card__name__winner"  :"resultado-card__name resultado-card__name__looser"}>{score.bloquePerdedor.set1}</IonCol>
                                        <IonCol size="2" className={score.bloqueGanador.set2 < score.bloquePerdedor.set2 ? "resultado-card__name resultado-card__name__winner":  "resultado-card__name resultado-card__name__looser"}>{score.bloquePerdedor.set2}</IonCol>
                                        <IonCol size="2" className="resultado-card__name resultado-card__name__looser">{score.bloquePerdedor.set3}</IonCol>
                                    </IonItem>
                                </IonCol>
                            </IonRow>
                        </IonCardContent>
                    </IonCard>
                </IonCol>
            </IonRow>
            </>)}
            
        </IonContent>
    </IonPage>
}

export default ListaResultadosPage;