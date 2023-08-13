import { useEffect, useMemo, useState } from "react";
import { IonCol, IonContent, IonItem, IonPage, IonRow, IonIcon, IonButton, IonFab, IonFabButton } from "@ionic/react";
import { useHistory } from "react-router";
import { checkmarkDone, createOutline, tennisball } from "ionicons/icons";

import Header from "../../components/Header";
import { usePreInscripcion } from "../../hooks/usePreInscripcion";
import ModalPreInscripcionForm from "../../components/ModalPreInscripcionForm";
import { PreInscripcion } from "../../interfaces/inscripcion";
import { confirmarInscripcion } from "../../axios/inscripcion";
import Alert from "../../components/Alert";

import "./PreInscripcion.scss";

export type PreInscripcionFormValues = {
    equipo: string,
    zona: number,
    categoria: number,
    estadoInscripcion: string
}

const PreInscripcionPage: React.FC = () => {

    const history = useHistory();

    const [isLoading, setIsLoading] = useState(true);

    const [openModal, setOpenModal] = useState(false);
    const [openSuccessAlert, setOpenSuccessAlert] = useState(false);

    const [jugadorState, setJugadorState] = useState<PreInscripcion>();
    const [indexJugador, setIndexJugador] = useState<number>(-1);

    const { listadoPreInscripcion} = usePreInscripcion();

    const listado = useMemo(() => listadoPreInscripcion, [listadoPreInscripcion]);

    useEffect(() => {
        setIsLoading(false);
    }, [listado]);

    const goBack = () => {
        history.goBack();
    }

    const setModalDataInscripcion = (index: number) => {
        if (listado !== undefined) {
            setOpenModal(true);
            setIndexJugador(index);
            setJugadorState(listado[index])
        }
    }

    const confirmInscripcion = (inscripcionData: PreInscripcionFormValues) => {
        if (listado !== undefined && jugadorState !== undefined) {
            const newJugadorState: PreInscripcion = {...jugadorState, estado: inscripcionData.estadoInscripcion, categoria: inscripcionData.categoria, zona: inscripcionData.zona, equipo: inscripcionData.equipo}
            listado[indexJugador] = newJugadorState
            setOpenModal(false)
        }
    }

    const inscript = async () => {
        const listadoInscriptos = listado?.filter((jugador) => jugador.estado === "INSCRIPTO" || jugador.estado === "RECHAZADO");
        if (listadoInscriptos !== undefined) {
            const response = await confirmarInscripcion(listadoInscriptos);
            if (response) {
                setOpenSuccessAlert(true);
            }
        }
    }

    const onCloseAlert = () => {
        setOpenSuccessAlert(false);
        history.push("/home");
    }

    return (<IonPage>
        <Header label="Inscripcion" action={goBack}/>
        <IonContent className="background-home">
            {isLoading && <p>Cargando...</p>}
            {listado.length === 0 && <IonRow>
                            <IonCol size="12" className="flex-align-center">
                                <h3 className="text-empty-players">No hay jugadores preinscriptos al momento!</h3>
                            </IonCol>
                        </IonRow>}
            {!isLoading && listado?.map((jugador, index) => <>
                <IonRow key={jugador._id}>
                    <IonCol size="12">
                        <IonItem lines="full" className="preinscripcion-item">
                            <div className="preinscripcion-item__content">
                                <div className="preinscripcion-item__container-one">
                                    <IonIcon icon={tennisball}  size="large" className="size-ball"/>
                                    <div>
                                        <h5 className="jugador-item__label-nombre">{jugador.nombre} {jugador.apellido}</h5>
                                        <h6 className="jugador-item__label-telefono">Tel: {jugador.telefono}</h6>
                                    </div>
                                </div>
                                <IonButton className="preinscripcion-item__button" onClick={() => setModalDataInscripcion(index)}>
                                    <IonIcon className="preinscripcion-item__button__icon" slot="icon-only" icon={createOutline} color="primary"></IonIcon>
                                </IonButton>
                            </div>
                        </IonItem>
                    </IonCol>
                </IonRow>
            </> 
            )}
            {listado.length > 0 &&  <IonFab className="fab-row-button">
                <IonFabButton onClick={inscript}>
                    <IonIcon icon={checkmarkDone}></IonIcon>
                </IonFabButton>
            </IonFab>}


            {jugadorState && <ModalPreInscripcionForm isOpen={openModal} setIsOpenModal={setOpenModal} jugador={jugadorState} setInscripcion={confirmInscripcion} />}

            <Alert isOpen={openSuccessAlert} closeAlert={onCloseAlert} header="Correcto" subHeader="Se han guardado todos los cambios" message="A partir de ahora, los jugadores confirmados ya pueden cargar resultados"  buttons={["Ok!"]}/>
        </IonContent>
    </IonPage>)
};

export default PreInscripcionPage;