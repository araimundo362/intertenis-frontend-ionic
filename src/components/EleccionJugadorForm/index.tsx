import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import dayjs from "dayjs";

import { ResultadosContext } from "../../context/ResultadosContext";
import { IonRow, IonCol, IonSelect, IonSelectOption, IonButton, IonDatetime, IonDatetimeButton, IonModal } from "@ionic/react";
import { useLiga } from "../../hooks/useLiga";
import { EleccionJugadorFormType } from "./types";

import "./EleccionJugador.scss";

type EleccionFormType = {
    _id: string
};

const EleccionJugadorForm: React.FC<EleccionJugadorFormType> = ({ categoria, idJugador }) => {
 
    
    const {handleSubmit, register, formState: { errors }} = useForm<EleccionFormType>({
        defaultValues: {
            _id: ""
        }
    });

    const { nextStep, setRival, setFecha } = useContext(ResultadosContext);

    const { players, getRivals } = useLiga();

    useEffect(() => {
        getRivals(categoria);
        const fecha = dayjs().format("DD/MM/YYYY");
        setFecha(fecha);
    }, []);// eslint-disable-line react-hooks/exhaustive-deps
    
    const onSubmit = (data: EleccionFormType) => {
        const userRival = players.find((pl) => pl._id === data._id);
        if (userRival !== undefined) {
            const { nombre, _id, equipo } = userRival
            const jugador = { nombre, _id, equipo};
            setRival(jugador);
            nextStep();
        }
    }

    const selectedDate = (fecha: any) => {
        const fechaParseada = dayjs(fecha).format("DD/MM/YYYY");
        setFecha(fechaParseada);
    }

    return <>
            <IonRow>
                <IonCol size="10" offset="1">
                    <h3 className="cargar-resultado__label">Selecciona el jugador con el que jugaste</h3>
                </IonCol>
            </IonRow>
            <form onSubmit={handleSubmit(onSubmit)}>
                {players.length && <IonRow>
                    <IonCol size="10" offset="1">
                        <IonSelect className="eleccion-jugador-form__select-rival" disabled={players.filter((jugador) => jugador._id !== idJugador).length === 0} interface="action-sheet" placeholder="Rival*" {...register("_id", {required: true})}>
                            {players.filter((jugador) => jugador._id !== idJugador).map((jugador) => <IonSelectOption key={jugador._id} value={jugador._id}>{jugador.nombre}</IonSelectOption>)}
                        </IonSelect>
                        <div className="error-message" style={errors._id ? { opacity: 1 } : undefined}>
                                {errors._id?.type === 'required' && <p role="alert" className="error-alert">Debe seleccionar un jugador</p>}
                        </div>
                    </IonCol>
                </IonRow>}
                <IonRow>
                    <IonCol size="10" offset="1">
                        <h3 className="cargar-resultado__label">Fecha del partido</h3>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol size="10" offset="1">
                            <IonDatetimeButton datetime="datetime" color="warning"/>                        
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol className="eleccion-jugador-form__submit-column">
                        <IonButton type="submit">Siguiente</IonButton>
                    </IonCol>           
                </IonRow>
            </form>

            <IonModal keepContentsMounted={true}>
                <IonDatetime onIonChange={(ev) => selectedDate(ev.detail.value)} size="cover" showDefaultTitle={true} showDefaultButtons={true} className="custom-datetime" preferWheel={true} id="datetime" presentation="date">
                <span slot="title">Selecione la fecha del partido</span>
                </IonDatetime>
            </IonModal>
    </>
}

export default EleccionJugadorForm;