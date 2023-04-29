import { IonButton, IonCol, IonInput, IonItem, IonLabel, IonRow } from "@ionic/react";
import { useContext } from "react";
import { ResultadosContext } from "../../context/ResultadosContext";
import { AuthContext } from "../../context/AuthContext";
import { useLiga } from "../../hooks/useLiga";
import Alert from "../Alert";

const CheckpointResultado: React.FC = () => {

    const { rival, resultado, status, fecha, prevStep } = useContext(ResultadosContext)
    const { userData, categoria, equipo } = useContext(AuthContext);

    const { cargarResultado, alertaResultadoPendienteConfirmacion, alertaResultadoConfirmado, alertaResultadoDiscrepancia } = useLiga();

    const onSubmit = async () => {
        const resultadoBody = {
            own: {
                nombre: `${userData.nombre} ${userData.apellido}`,
                _id: userData._id,
                statusScore: status,
                miEquipo: equipo
            }, 
            fecha,
            categoria,
            score: resultado,
            rival: {
                nombre: rival.nombre,
                _id: rival._id,
                equipo: rival.equipo
            }
        }

        console.log("cual es body a enviar?", resultadoBody)
        const response = await cargarResultado(resultadoBody);
    }

    const cerrarAlerta = () => {
        console.log("sarasa");
    };

    return <>
        <IonRow>
            <IonCol size="10" offset="1">
                <h3 className="cargar-resultado__label">Partido a cargar</h3>
            </IonCol>
        </IonRow>
        <IonRow>
            <IonCol size="10" offset="1">
                <IonItem fill="solid" className="login-inputs">
                    <IonLabel position="stacked">Rival</IonLabel>
                    <IonInput value={rival.nombre} disabled  />
                </IonItem>
            </IonCol>
        </IonRow>
        <IonRow>
            <IonCol size="10" offset="1">
                <IonItem fill="solid" className="login-inputs">
                    <IonLabel position="stacked">{status === "GANE" ? "Gane" : "Perdi"}</IonLabel>
                    <IonInput value={resultado} disabled  />
                </IonItem>
            </IonCol>
        </IonRow>
        <IonRow>
            <IonCol size="10" offset="1">
                <IonItem fill="solid" className="login-inputs">
                    <IonLabel position="stacked">Partido jugado el</IonLabel>
                    <IonInput value={fecha} disabled  />
                </IonItem>
            </IonCol>
        </IonRow>
        <IonRow>
            <IonCol className="eleccion-jugador-form__submit-column" size="10" offset="1">
                <IonButton className="width-button-50" onClick={onSubmit}>Confirmar</IonButton>
            </IonCol>
        </IonRow>
        <IonRow>
            <IonCol className="eleccion-jugador-form__submit-column" size="10" offset="1">
                <IonButton className="width-button-50" onClick={prevStep}>Atras</IonButton>
            </IonCol>
        </IonRow>

        <Alert isOpen={alertaResultadoPendienteConfirmacion} header="Perfecto!" subHeader="El resultado se ha cargado correctamente" message="Una vez que su rival cargue el resultado, se confirmara" closeAlert={cerrarAlerta} buttons={["Ok!"]}/>
        <Alert isOpen={alertaResultadoConfirmado} header="Confirmado!" subHeader="El resultado se ha confirmado" message="Veras actualizada la tabla de posiciones!" closeAlert={cerrarAlerta} buttons={["Ok!"]}/>
        <Alert isOpen={alertaResultadoDiscrepancia} header="Define Intertenis!" subHeader="El resultado ingresado es distinto al que cargo tu rival" message="Comunicate con German Diaz y tu rival, para confirmar el resultado!" closeAlert={cerrarAlerta} buttons={["Ok!"]}/>
    </>
}

export default CheckpointResultado;