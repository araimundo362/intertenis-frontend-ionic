import { IonAlert, IonButton, IonCol, IonIcon, IonInput, IonItem, IonLabel, IonRadio, IonRadioGroup, IonRow, IonText } from "@ionic/react";
import React, { useContext, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { ResultadosContext } from "../../context/ResultadosContext";

import "./ResultadoForm.scss";
import { checkmarkCircleSharp } from "ionicons/icons";

type ResultadoFormType = {
    primerSet: string,
    segundoSet: string,
    tercerSet?: string,
    // resultado: string,
    status: "GANE" | "PERDI"
};

const ResultadoForm: React.FC = () => {

    const { handleSubmit, register, formState: { errors }, setValue, getValues } = useForm<ResultadoFormType>();

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
        if (value?.length === 3) {
            setValue("primerSet", value);
            segundoSetInputRef.current?.setFocus();
        }
    }

    const handleSegundoSetInput = (value: string | null | undefined) => {
        if (value?.length === 3) {
            setValue("segundoSet", value);
            tercerSetInputRef.current?.setFocus();
        }
    }

    const handleTercerSetInput = (value: string | null | undefined) => {
        if (value?.length === 3) {
            tercerSetInputRef.current?.setBlur();
            setValue("tercerSet", value);
        }
    }

    return <React.Fragment>
        <IonRow>
            <IonCol size="10" offset="1">
                <h3 className="cargar-resultado__label">Decinos como salio el partido!</h3>
            </IonCol>
        </IonRow>
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
                    <IonInput {...register("primerSet", {required: true})} ref={primerSetInputRef} max={2} onIonChange={(ev) => handlePrimerSetInput(ev)} />
                </IonItem>
            </IonCol>
            <IonCol size="4">
            <IonItem fill="solid" className="resultado-form__score-input">
                    <IonLabel position="floating">2do set*</IonLabel>
                    <IonInput {...register("segundoSet", {required: true})} max={2} onIonChange={(ev) => handleSegundoSetInput(ev.detail.value)}  ref={segundoSetInputRef}/>
                </IonItem>
            </IonCol>
            <IonCol size="4">
            <IonItem fill="solid" className="resultado-form__score-input">
                    <IonLabel position="floating">3er set*</IonLabel>
                    <IonInput {...register("tercerSet")} max={2}  ref={tercerSetInputRef} onIonChange={(ev) => handleTercerSetInput(ev.detail.value)}/>
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