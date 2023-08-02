import { IonButton, IonCol, IonInput, IonItem, IonLabel, IonNote, IonRow, IonSelect, IonSelectOption } from "@ionic/react"
import { useState } from "react"
import { useLiga } from "../../hooks/useLiga";
import { Jugador } from "../../interfaces/user";
import { ConfirmacionResultado } from "../../interfaces/resultado";
import Alert from "../Alert";
import { useHistory } from "react-router";

const DefinirComponent: React.FC = () => {

    const history = useHistory();
    const [ganadorPartido, setGanadorPartido] = useState<Jugador>();
    const [perdedorPartido, setPerdedorPartido] = useState<Jugador>();

    const [alertOpen, setAlertOpen] = useState(false);
    const [header, setHeader] = useState("");
    const [message, setMessage] = useState("");

    const [resultado, setResultado] = useState("");

    const { getRivals, players, confirmarResultado } = useLiga();

    const onSelectCategory = async (categoria: number) => {
        await getRivals(categoria);
    }

    const ganadorSelected = (jugadorId: string) => {
        const jugadorGanador = players.find((jug) => jug._id === jugadorId);
        if (jugadorGanador !== undefined) setGanadorPartido(jugadorGanador)
    }

    const perdedorSelected = (jugadorId: string) => {
        const jugadorPerdedor = players.find((jug) => jug._id === jugadorId);
        if (jugadorPerdedor !== undefined) setPerdedorPartido(jugadorPerdedor);
    }

    const handleChangeResultado = (score: string | null | undefined) => {
        if (score && score.length > 3) {
            setResultado(score);
        }
    }

    const handleConfirmResult = async () => {

        if (ganadorPartido !== undefined && perdedorPartido !== undefined) {
            const resultadoConfirmado: ConfirmacionResultado = {
                ganador: {
                    _id: ganadorPartido._id,
                    equipoGanador: ganadorPartido.equipo
                },
                perdedor: {
                    _id: perdedorPartido?._id,
                    equipoPerdedor: perdedorPartido?.equipo
                },
                resultado
            }
            const status = await confirmarResultado(resultadoConfirmado);
            if (status === "CONFIRM") {
                setHeader("Confirmado")
                setMessage("Se procedera a actualizar la tabla de posiciones")
                setAlertOpen(true);
            }
        }
    };

    const goHome = () => {
        history.push("/home")
    }

    return <>
                    <IonRow>
                        <IonCol size="10" offset="1">
                            <IonItem fill="solid">
                                <IonSelect className="select" placeholder="Categoria*" onIonChange={(ev) => onSelectCategory(ev.detail.value)}>
                                    <IonSelectOption value={1}>1ra</IonSelectOption>
                                    <IonSelectOption value={2}>2da</IonSelectOption>
                                    <IonSelectOption value={3}>3ra</IonSelectOption>
                                </IonSelect>
                            </IonItem>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol size="10" offset="1">
                            <h3 className="cargar-resultado__label">Jugadores</h3>
                        </IonCol>
                    </IonRow>
                    {players.length > 0 && <IonRow>
                                                <IonCol size="10" offset="1">
                                                    <IonSelect placeholder="Ganador del partido*" onIonChange={(ev) => ganadorSelected(ev.detail.value)}>
                                                        {players.map((jugador) => <IonSelectOption value={jugador._id}>{jugador.nombre}</IonSelectOption>)}
                                                    </IonSelect>
                                                </IonCol>
                                        </IonRow>}
                    {ganadorPartido && <IonRow>
                                                <IonCol size="10" offset="1">
                                                    <IonSelect placeholder="Perdedor del partido*" onIonChange={(ev) => perdedorSelected(ev.detail.value)}>
                                                        {players.filter((jugador) => jugador._id !== ganadorPartido._id).map((jugador) => <IonSelectOption value={jugador._id}>{jugador.nombre}</IonSelectOption>)}
                                                    </IonSelect>
                                                </IonCol>
                                        </IonRow>}
                    {ganadorPartido && perdedorPartido && 
                        <>
                            <IonRow>
                                <IonCol size="10" offset="1">
                                    <h3 className="cargar-resultado__label">Resultado</h3>
                                </IonCol>
                            </IonRow>
                            <IonRow>
                                <IonCol size="10" offset="1">
                                    <IonItem fill="solid" className="login-inputs">
                                        <IonLabel position="floating">Resultado*</IonLabel>
                                            <IonInput placeholder="Formato: 62 64 / 75 36 75" onIonChange={(ev) => handleChangeResultado(ev.detail.value)} />
                                            <IonNote slot="helper">Formato: 61 63 // 26 64 76 // 64 60</IonNote>
                                    </IonItem>
                                </IonCol>
                            </IonRow>
                            <IonRow>
                                <IonCol size="8" offset="2">
                                    <IonButton onClick={handleConfirmResult}>Confirmar</IonButton>
                                </IonCol>
                            </IonRow>
                        </>
                    }
                    <Alert isOpen={alertOpen} header={header} message={message} buttons={["Ok!"]} closeAlert={goHome}/>
    </>
}

export default DefinirComponent;