import { IonButton, IonCol, IonInput, IonItem, IonLabel, IonRadio, IonRadioGroup, IonRow, IonText } from "@ionic/react";
import { useContext, useRef } from "react";
import { useForm } from "react-hook-form";
import { ResultadosContext } from "../../context/ResultadosContext";

import "./ResultadoForm.scss";

type ResultadoFormType = {
    primerSet: string,
    segundoSet: string,
    tercerSet?: string,
    // resultado: string,
    status: "GANE" | "PERDI"
};

const ResultadoForm: React.FC = () => {

    const primerSetInputRef = useRef<HTMLIonInputElement>(null);
    const segundoSetInputRef = useRef<HTMLIonInputElement>(null);
    const tercerSetInputRef = useRef<HTMLIonInputElement>(null);

    const { handleSubmit, register, formState: { errors }, setValue, getValues } = useForm<ResultadoFormType>();

    const { prevStep, nextStep, setStatus, setResultado } = useContext(ResultadosContext);

    const onSubmit = (data: ResultadoFormType) => {
        let resultadoFinal = getValues("primerSet") + " " + getValues("segundoSet");
        const set3 = getValues("tercerSet"); 
        if (set3) resultadoFinal += " " + set3;

        setResultado(resultadoFinal);
        setStatus(data.status);
        nextStep();
    };

    const setStatusValue = (value: "GANE" | "PERDI") => {
        setValue("status", value)
    }

    const handlePrimerSetInput = (value: string | null | undefined) => {
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

    return <>
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
                    <IonInput {...register("primerSet", {required: true})} ref={primerSetInputRef} max={2} onIonChange={(ev) => handlePrimerSetInput(ev.detail.value)} />
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
            <IonCol>
            <IonRadioGroup {...register("status", { required: true })} onIonChange={(ev) => setStatusValue(ev.detail.value)}>
                        <IonRow>
                            <IonCol size="5" offset="1" className="resultado-form__radio-column">
                                <IonText>
                                    <h4 className="h4-label">Gane</h4>
                                </IonText>
                                <IonRadio value={"GANE"} className="resultado-form__radio" />
                            </IonCol>
                            <IonCol size="5" offset="1" className="resultado-form__radio-column">
                                <IonText>
                                    <h4 className="h4-label">Perdi</h4>
                                </IonText>
                                <IonRadio value="PERDI" className="resultado-form__radio"/>
                            </IonCol>
                        </IonRow>
        </IonRadioGroup>
        <div className="error-message" style={errors.status ? { opacity: 1 } : undefined}>
                    {errors.status?.type === 'required' && <p role="alert" className="error-alert">Debe marcar como salio en el partido</p>}
        </div>
            </IonCol>

        </IonRow>
        <IonRow>
            <IonCol className="eleccion-jugador-form__submit-column"> 
                <IonButton className="width-button-50" type="submit">
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
    </>
};

export default ResultadoForm;

/*

 <IonRow>
            <IonCol size="10" offset="1">
                <IonItem fill="solid" className="login-inputs">
                    <IonLabel position="floating">Resultado*</IonLabel>
                    <IonInput {...register("resultado", {required: true})} placeholder="Formato: 62 64 / 75 36 75"  />
                    <IonNote slot="helper">Formato: 61 63 // 26 64 76 // 64 60</IonNote>
                </IonItem>
                <div className="error-message" style={errors.resultado ? { opacity: 1 } : undefined}>
                    {errors.resultado?.type === 'required' && <p role="alert" className="error-alert">Debe ingresar un resultado</p>}
                </div>
            </IonCol>
        </IonRow>

*/