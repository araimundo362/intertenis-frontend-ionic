import { IonAlert, IonButton, IonCol, IonContent, IonInput, IonItem, IonLabel, IonPage, IonRow, IonSelect, IonSelectOption, IonSpinner, IonToast } from "@ionic/react"
import { useHistory, useLocation } from "react-router"
import { useState } from "react";

import Header from "../../components/Header";
import { useJugadores } from "../../hooks/useJugadores";
import { EQUIPOS } from "../../constants/constants";

import "./DetalleJugador.scss";

const DetalleJugador: React.FC = () => {
    
    const history = useHistory();
    const location = useLocation<any>();

    const [alertOpen, setAlertOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const [nuevoEquipoError, setNuevoEquipoError] = useState(false);

    const [nuevoEquipo, setNuevoEquipo] = useState("");

    const { borrarJugador, asignarEquipo } = useJugadores();

    const goBack = () => history.goBack();
    
    const onDelete = () => setAlertOpen(true);

    const onDeleteAction = async () => {
        setAlertOpen(false);
        setIsDeleting(true);
        try {
            const resp = await borrarJugador(location.state.id);
            setIsDeleting(false);
            history.replace("/jugadores");
        } catch (e) {
            setIsDeleting(false);
            console.error(e);
        }     
    }

    const changeTeamValue = (team: string) => {
        setNuevoEquipo(team);
    }

    const onSetNuevoEquipo = async () => {
        if (nuevoEquipo !== "") {
            const asignacion = await asignarEquipo(location.state.id, nuevoEquipo);
            if (asignacion) {
                history.replace("/jugadores");
            } else {
                setNuevoEquipoError(true);
            }
        } else {

        }
    }

    return <IonPage>
        <Header action={goBack} label={`${location.state.nombre} ${location.state.apellido}`}/>
        <IonContent className="background-home">
        {isDeleting && <IonSpinner name="crescent" />}
        {!isDeleting && <>
            <IonRow>
                <IonCol size="10" offset="1" className="detalle-column-center">
                    <IonButton color={"danger"} onClick={onDelete}>Borrar Jugador</IonButton>
                </IonCol>
            </IonRow>
            
            <IonRow>
                <IonCol className="detalle-column-center">
                    <h3 className="text-empty-players">Equipo Actual</h3>
                </IonCol>
            </IonRow>
            <IonRow>
                <IonCol size="10" offset="1" className="detalle-column-center">
                <IonItem fill="solid">
                                <IonLabel position="stacked">Equipo*</IonLabel>
                                <IonInput disabled={true} value={location.state.equipo}></IonInput>
                            </IonItem>
                </IonCol>
            </IonRow>
            <IonRow>
                <IonCol className="detalle-column-center">
                    <h3 className="text-empty-players">Asignar nuevo equipo</h3>
                </IonCol>
            </IonRow>
            <IonRow>
                <IonCol size="10" offset="1" className="detalle-column-center">
                        <IonSelect className="inputs-witdh50 background-select" interface="action-sheet" placeholder="Equipo nuevo*" onIonChange={(ev) => changeTeamValue(ev.detail.value) }>
                           {EQUIPOS.map((team) => <IonSelectOption value={team.value}>{team.opcion}</IonSelectOption>)}
                        </IonSelect>
                </IonCol>
            </IonRow>
            <IonRow>
                <IonCol className="detalle-column-center">
                    <IonButton color={"warning"} onClick={onSetNuevoEquipo}> Asignar </IonButton>
                </IonCol>
            </IonRow>
        </>}
        </IonContent>

        <IonAlert isOpen={alertOpen} header="Importante!" subHeader="Estas por borrar a este jugador" buttons={[
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: () => {
              setAlertOpen(false);
            },
          },
          {
            text: 'Confirmar',
            role: 'confirm',
            handler: () => onDeleteAction()
          },
        ]}></IonAlert>

        <IonToast
          isOpen={nuevoEquipoError}
          message="Ocurrio un error al actualizar el equipo"
          onDidDismiss={() => setNuevoEquipoError(false)}
          duration={5000}
        />
    </IonPage>
};

export default DetalleJugador;