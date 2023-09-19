import { IonButton, IonCol, IonDatetime, IonDatetimeButton, IonInput, IonItem, IonLabel, IonModal, IonRow, IonSelect, IonSelectOption } from "@ionic/react"
import { useContext, useRef, useState } from "react"
import { useLiga } from "../../hooks/useLiga";
import { Jugador } from "../../interfaces/user";
import { ConfirmacionResultado } from "../../interfaces/resultado";
import Alert from "../Alert";
import { useHistory } from "react-router";
import dayjs from "dayjs";

import "./DefinirResultado.scss";
import { GlobalContext } from "../../context/GlobalContext";

const DefinirComponent: React.FC = () => {

    const [fecha, setFecha ] = useState(dayjs().format("DD/MM/YYYY"));
    
    const primerSetInputRef = useRef<HTMLIonInputElement>(null);
    const segundoSetInputRef = useRef<HTMLIonInputElement>(null);
    const tercerSetInputRef = useRef<HTMLIonInputElement>(null);
    
    const { categorias } = useContext(GlobalContext);
    
    const history = useHistory();
    const [ganadorPartido, setGanadorPartido] = useState<Jugador>();
    const [perdedorPartido, setPerdedorPartido] = useState<Jugador>();

    const [primerSet, setPrimerSet] = useState("");
    const [segundoSet, setSegundoSet] = useState("");
    const [tercerSet, setTercerSet] = useState("");

    const [alertOpen, setAlertOpen] = useState(false);
    const [header, setHeader] = useState("");
    const [message, setMessage] = useState("");

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
    
    const handleConfirmResult = async () => {
        let resultado = primerSet + " " + segundoSet;
        if (tercerSet) resultado += " " + tercerSet;

        if (ganadorPartido !== undefined && perdedorPartido !== undefined) {
            const resultadoConfirmado: ConfirmacionResultado = {
                ganador: {
                    _id: ganadorPartido._id,
                    equipoGanador: ganadorPartido.equipo,
                    nombre: ganadorPartido.nombre
                },
                perdedor: {
                    _id: perdedorPartido?._id,
                    equipoPerdedor: perdedorPartido?.equipo,
                    nombre: perdedorPartido.nombre
                },
                resultado,
                fecha
            }

           const status = await confirmarResultado(resultadoConfirmado);
            if (status === "CONFIRM") {
                setHeader("Confirmado")
                setMessage("Se procedera a actualizar la tabla de posiciones")
                setAlertOpen(true);
            }
        }
    };

    const keyDownPressPrimerSet = (ev: any) => {
        if (ev.key === "Backspace" && primerSetInputRef.current) {
            primerSetInputRef.current.value = ""
        }
    }

    const keyDownPressSegundoSet = (ev: any) => {
        if (ev.key === "Backspace" && segundoSetInputRef.current) {
            segundoSetInputRef.current.value = ""
        }
    }

    const keyDownPressTercerSet = (ev: any) => {
        if (ev.key === "Backspace" && tercerSetInputRef.current) {
            tercerSetInputRef.current.value = ""
        }
    }

    const handlePrimerSetInput = (value: any) => {
        
        if (value && value.length === 1 && primerSetInputRef.current) {
            primerSetInputRef.current.value = value + "/";
        }
        if (value?.length === 3) {
            setPrimerSet(value);
            segundoSetInputRef.current?.setFocus();
        }
    }

    const handleSegundoSetInput = (value: string | null | undefined) => {
        if (value && value.length === 1 && segundoSetInputRef.current) {
            segundoSetInputRef.current.value = value + "/";
        }
        if (value?.length === 3) {
            setSegundoSet(value);
            tercerSetInputRef.current?.setFocus();
        }
    }

    const handleTercerSetInput = (value: string | null | undefined) => {
        if (value && value.length === 1 && tercerSetInputRef.current) {
            tercerSetInputRef.current.value = value + "/";
        }
        if (value?.length === 3) {
            tercerSetInputRef.current?.setBlur();
            setTercerSet(value);
        }
    }

    const goHome = () => {
        history.push("/home")
    }

    const selectedDate = (fecha: any) => {
        const fechaParseada = dayjs(fecha).format("DD/MM/YYYY");
        setFecha(fechaParseada);
    }

    return <>
            <IonRow>
                    <IonCol size="10" offset="1">
                        <h3 className="cargar-resultado__label">Fecha del partido</h3>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol size="10" offset="1">
                            <IonDatetimeButton  datetime="datetime" color="warning"/>                        
                    </IonCol>
                </IonRow>
                    <IonRow>
                        <IonCol size="10" offset="1">
                                <IonSelect className="eleccion-jugador-form__select-rival" placeholder="Categoria*" onIonChange={(ev) => onSelectCategory(ev.detail.value)}>
                                {categorias.map((cat) => <IonSelectOption key={cat.numero} value={cat.numero}>{cat.categoria}</IonSelectOption>)}
                                </IonSelect>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol size="10" offset="1">
                            <h3 className="cargar-resultado__label">Jugadores</h3>
                        </IonCol>
                    </IonRow>
                    {players.length > 0 && <IonRow>
                                                <IonCol size="10" offset="1">
                                                    <IonSelect className="select-admin-score" placeholder="Ganador del partido*" onIonChange={(ev) => ganadorSelected(ev.detail.value)}>
                                                        {players.map((jugador) => <IonSelectOption key={jugador._id} value={jugador._id}>{jugador.nombre}</IonSelectOption>)}
                                                    </IonSelect>
                                                </IonCol>
                                        </IonRow>}
                    {ganadorPartido && <IonRow>
                                                <IonCol size="10" offset="1">
                                                    <IonSelect  className="select-admin-score" onIonChange={(ev) => perdedorSelected(ev.detail.value)} placeholder="Perdedor del partido*" >
                                                        {players.filter((jugador) => jugador._id !== ganadorPartido._id).map((jugador) => <IonSelectOption key={jugador._id} value={jugador._id}>{jugador.nombre}</IonSelectOption>)}
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
                                <IonCol size="4">
                                    <IonItem fill="solid" className="resultado-form__score-input">
                                        <IonLabel className="resultado-form__label-input" position="floating">1er set*</IonLabel>
                                        <IonInput className="inputs-score" onKeyDown={ev => keyDownPressPrimerSet(ev)} ref={primerSetInputRef} max={2} onIonChange={(ev) => handlePrimerSetInput(ev.detail.value)} />
                                    </IonItem>
                                </IonCol>
                                <IonCol size="4">
                                    <IonItem fill="solid" className="resultado-form__score-input">
                                        <IonLabel className="resultado-form__label-input" position="floating">2do set*</IonLabel>
                                        <IonInput className="inputs-score" onKeyDown={ev => keyDownPressSegundoSet(ev)} max={2} onIonChange={(ev) => handleSegundoSetInput(ev.detail.value)}  ref={segundoSetInputRef}/>
                                    </IonItem>
                                </IonCol>
                                <IonCol size="4">
                                    <IonItem fill="solid" className="resultado-form__score-input">
                                        <IonLabel className="resultado-form__label-input" position="floating">3er set*</IonLabel>
                                        <IonInput className="inputs-score" onKeyDown={ev => keyDownPressTercerSet(ev)} max={2}  ref={tercerSetInputRef} onIonChange={(ev) => handleTercerSetInput(ev.detail.value)}/>
                                    </IonItem>
                                </IonCol>
                            </IonRow>
                            <IonRow>
                                <IonCol size="8" offset="2" className="center-button">
                                    <IonButton disabled={!primerSet && !segundoSet} onClick={handleConfirmResult}>Confirmar</IonButton>
                                </IonCol>
                            </IonRow>
                        </>
                    }
                
                    <Alert isOpen={alertOpen} header={header} message={message} buttons={["Ok!"]} closeAlert={goHome}/>
                    <IonModal keepContentsMounted={true}>
                        <IonDatetime onIonChange={(ev) => selectedDate(ev.detail.value)} className="custom-datetime" id="datetime" presentation="date" />
                    </IonModal>
    </>
}

export default DefinirComponent;