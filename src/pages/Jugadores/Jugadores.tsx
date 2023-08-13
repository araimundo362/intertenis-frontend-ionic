import { IonContent, IonItem, IonLabel, IonList, IonPage, IonSegment, IonSegmentButton, IonSpinner } from "@ionic/react";
import { useHistory } from "react-router";
import { useEffect, useState } from "react";
import { ellipsisVerticalOutline } from "ionicons/icons";

import Header from "../../components/Header";
import { useJugadores } from "../../hooks/useJugadores";
import JugadorItem from "../../components/JugadorItem";
import { JugadorInscripto } from "../../interfaces/inscripcion";

import "./Jugadores.scss";

const JugadoresPage: React.FC = () => {

    const { isLoading, jugadoresInscriptos, jugadoresRechazados } = useJugadores();

    const [segmentInscriptos, setSegmentInscriptos] = useState(true);

    const [players, setJugadores] = useState<JugadorInscripto[]>([]);
    
    const history = useHistory();

    const goBack = () => history.replace("/home");

    useEffect(() => {
        setJugadores(jugadoresInscriptos);
    }, [jugadoresInscriptos])
    
    const onSegmentChange = (value: any) => {
        if (value === "INSCRIPTO") {
            setSegmentInscriptos(true)
            setJugadores(jugadoresInscriptos);
        } else {
            setSegmentInscriptos(false);
            setJugadores(jugadoresRechazados);
        }
    }

    const onDetalleAction = (idJugador: string, nombreJugador: string, apellidoJugador: string, equipoJugador: string) => {
        history.push({pathname: "/administrar-jugador", state: {id: idJugador, nombre: nombreJugador, apellido: apellidoJugador, equipo: equipoJugador}});
    }

    return <IonPage>
        <Header action={goBack} label="Jugadores"/>
        <IonContent className="background-home">
        {isLoading && <IonItem>
                                <IonLabel>Crescent</IonLabel>
                                    <IonSpinner name="crescent"></IonSpinner>
                        </IonItem>}
            {!isLoading && <><IonSegment value={ segmentInscriptos ? "INSCRIPTO" : "RECHAZADO"} onIonChange={(ev) => onSegmentChange(ev.detail.value)}>
                <IonSegmentButton value="INSCRIPTO">
                    <IonLabel>Inscriptos</IonLabel>
                </IonSegmentButton>
                <IonSegmentButton value="RECHAZADO">
                    <IonLabel>Rechazados</IonLabel>
                </IonSegmentButton>
            </IonSegment>
            <IonList className="list">
                {players.map((jugador) => <JugadorItem key={jugador._id} nombre={jugador.nombre} apellido={jugador.apellido} telefono={jugador.telefono} iconButton={ellipsisVerticalOutline} buttonAction={() => onDetalleAction(jugador._id, jugador.nombre, jugador.apellido, jugador.equipo)}/>)}
            </IonList>
            </>}
        </IonContent>
    </IonPage>
};

export default JugadoresPage;