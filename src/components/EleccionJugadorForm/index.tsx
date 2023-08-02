import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { ResultadosContext } from "../../context/ResultadosContext";
import { IonRow, IonCol, IonSelect, IonSelectOption, IonButton } from "@ionic/react";
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

    const { nextStep, setRival } = useContext(ResultadosContext);

    const { players, getRivals } = useLiga();

    useEffect(() => {
        getRivals(categoria);
    }, []);
    
    const onSubmit = (data: EleccionFormType) => {
        const userRival = players.find((pl) => pl._id === data._id);
        if (userRival !== undefined) {
            const { nombre, _id, equipo } = userRival
            const jugador = { nombre, _id, equipo};
            setRival(jugador);
            nextStep();
        }
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
                            {players.filter((jugador) => jugador._id !== idJugador).map((jugador) => <IonSelectOption value={jugador._id}>{jugador.nombre}</IonSelectOption>)}
                        </IonSelect>
                        <div className="error-message" style={errors._id ? { opacity: 1 } : undefined}>
                                {errors._id?.type === 'required' && <p role="alert" className="error-alert">Debe seleccionar un jugador</p>}
                        </div>
                    </IonCol>
                </IonRow>}
                <IonRow>
                    <IonCol className="eleccion-jugador-form__submit-column">
                        <IonButton type="submit">Siguiente</IonButton>
                    </IonCol>           
                </IonRow>
            </form>
    </>
}

export default EleccionJugadorForm;