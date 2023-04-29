import { IonButton, IonCol, IonDatetime, IonRow } from "@ionic/react";
import { useContext } from "react";
import { ResultadosContext } from "../../context/ResultadosContext";
import { useForm } from "react-hook-form";

const FechaForm: React.FC = () => {

    const { prevStep, nextStep, setFecha, fecha } = useContext(ResultadosContext);

    const selectedDate = (fecha: any) => {
        const fechaParseada: string = fecha.slice(0,10)
        setFecha(fechaParseada);
    }

    return <>
    <form>
        <IonRow>
            <IonCol size="10" offset="1">
                <IonDatetime firstDayOfWeek={1} presentation="date" showDefaultTitle={true} onIonChange={(ev) => selectedDate(ev.detail.value)}>
                    <span slot="title">Selecione la fecha del partido</span>
                </IonDatetime>
            </IonCol>
        </IonRow>
        <IonRow>
            <IonCol className="eleccion-jugador-form__submit-column"> 
                <IonButton className="width-button-50" disabled={fecha === ""} onClick={nextStep}>
                Siguiente
                </IonButton>
            </IonCol>
        </IonRow>
        <IonRow>
            <IonCol className="eleccion-jugador-form__submit-column"> 
                <IonButton className="width-button-50" onClick={prevStep}>
                Atras
                </IonButton>
            </IonCol>
        </IonRow>
    </form>
    </>
}

export default FechaForm;