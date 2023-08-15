import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonIcon, IonInput, IonItem, IonLabel, IonRow } from "@ionic/react";
import React, { useContext, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { ResultadosContext } from "../../context/ResultadosContext";
import { checkmarkCircleSharp } from "ionicons/icons";

import "./ResultadoForm.scss";

type ResultadoFormType = {
    primerSet: string,
    segundoSet: string,
    tercerSet?: string,
    // resultado: string,
    status: "GANE" | "PERDI"
};

const ResultadoForm: React.FC = () => {

    const { handleSubmit, register, setValue, getValues } = useForm<ResultadoFormType>();

    const { prevStep, nextStep, setStatus, setResultado } = useContext(ResultadosContext);

    const [isSelected, setIsSelected] = useState("");

    const primerSetInputRef = useRef<HTMLIonInputElement>(null);
    const segundoSetInputRef = useRef<HTMLIonInputElement>(null);
    const tercerSetInputRef = useRef<HTMLIonInputElement>(null);

    const onSubmit = (data: ResultadoFormType) => {
        let resultadoFinal = getValues("primerSet") + " " + getValues("segundoSet");
        const set3 = getValues("tercerSet"); 
        if (set3) resultadoFinal += " " + set3;

        setResultado(resultadoFinal);
        setStatus(data.status);
        nextStep();
    };

    const setStatusValue = (value: "GANE" | "PERDI") => {
        setIsSelected(value);
        setValue("status", value);
    }

    const handlePrimerSetInput = (value: any) => {
        
        if (value && value.length === 1 && primerSetInputRef.current) {
            primerSetInputRef.current.value = value + "-";
        }
        if (value?.length === 3) {
            setValue("primerSet", value);
            segundoSetInputRef.current?.setFocus();
        }
    }

    const handleSegundoSetInput = (value: string | null | undefined) => {
        if (value && value.length === 1 && segundoSetInputRef.current) {
            segundoSetInputRef.current.value = value + "-";
        }
        if (value?.length === 3) {
            setValue("segundoSet", value);
            tercerSetInputRef.current?.setFocus();
        }
    }

    const handleTercerSetInput = (value: string | null | undefined) => {
        if (value && value.length === 1 && tercerSetInputRef.current) {
            tercerSetInputRef.current.value = value + "-";
        }
        if (value?.length === 3) {
            tercerSetInputRef.current?.setBlur();
            setValue("tercerSet", value);
        }
    }

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

    return <React.Fragment>
        <IonCard color="light">
            <IonCardHeader>
                    <IonCardTitle className="card-title"><span>Importante!</span></IonCardTitle>
                    <IonCardSubtitle className="card-subtitle">Ejemplo: 5-7 6-4 7-6 // 6-4 6-0</IonCardSubtitle>
            </IonCardHeader>

            <IonCardContent>
                <IonLabel className="label-aviso">Ambos jugadores deberan cargar el mismo resultado, y marcar el boton correspondiente!</IonLabel>
            </IonCardContent>
        </IonCard>
        <form onSubmit={handleSubmit(onSubmit)}>
        <IonRow>
            <IonCol size="10" offset="1">
                <h3 className="cargar-resultado__label">Resultado</h3>
            </IonCol>
        </IonRow>
        <IonRow>
            <IonCol size="4">
                <IonItem fill="solid" className="resultado-form__score-input">
                    <IonLabel position="floating">1er set*</IonLabel>
                    <IonInput onKeyDown={ev => keyDownPressPrimerSet(ev)} {...register("primerSet", {required: true})} ref={primerSetInputRef} max={2} onIonChange={(ev) => handlePrimerSetInput(ev.detail.value)} />
                </IonItem>
            </IonCol>
            <IonCol size="4">
            <IonItem fill="solid" className="resultado-form__score-input">
                    <IonLabel position="floating">2do set*</IonLabel>
                    <IonInput onKeyDown={ev => keyDownPressSegundoSet(ev)} {...register("segundoSet", {required: true})} max={2} onIonChange={(ev) => handleSegundoSetInput(ev.detail.value)}  ref={segundoSetInputRef}/>
                </IonItem>
            </IonCol>
            <IonCol size="4">
            <IonItem fill="solid" className="resultado-form__score-input">
                    <IonLabel position="floating">3er set*</IonLabel>
                    <IonInput onKeyDown={ev => keyDownPressTercerSet(ev)} {...register("tercerSet")} max={2}  ref={tercerSetInputRef} onIonChange={(ev) => handleTercerSetInput(ev.detail.value)}/>
                </IonItem>
            </IonCol>
        </IonRow>
        <IonRow>
            <IonCol size="6">
                <IonButton onClick={() => setStatusValue("GANE")} className={`sede-button ${isSelected === "GANE" ? "button-color-active" : ""}`} fill="outline">
                    GANE
                   {isSelected === "GANE" && <IonIcon slot="end" icon={checkmarkCircleSharp}></IonIcon>}
                </IonButton>
            </IonCol>
            <IonCol size="6">
            <IonButton onClick={() => setStatusValue("PERDI")}  className={`sede-button ${isSelected === "PERDI" ? "button-color-active" : ""}`} fill="outline">
                    PERDI
                   {isSelected === "PERDI" && <IonIcon slot="end" icon={checkmarkCircleSharp}></IonIcon>}
                </IonButton>
            </IonCol>
        </IonRow>
        <IonRow>
            <IonCol className="eleccion-jugador-form__submit-column"> 
                <IonButton  disabled={isSelected === ""} className="width-button-50" type="submit">
                Siguiente
                </IonButton>
            </IonCol>
        </IonRow>
        </form>
        <IonRow>
            <IonCol className="eleccion-jugador-form__submit-column" >
                <IonButton className="width-button-50" onClick={prevStep}>
                    Atras    
                </IonButton>
            </IonCol>
        </IonRow>

    </React.Fragment>
};

export default ResultadoForm;