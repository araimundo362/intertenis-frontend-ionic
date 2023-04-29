import { IonAlert, IonButton, IonCol, IonContent, IonFooter, IonImg, IonInput, IonItem, IonLabel, IonPage, IonRow } from "@ionic/react";
import { useHistory } from "react-router";
import { useForm } from "react-hook-form";

import { axiosRegister } from "../../axios/auth";
import TennisBallComponent from "../../components/TennisBall";

import RED from "../../assets/Red_.jpg";
import LOGO from "../../assets/logo_intertenis.png";

import "./Register.scss";
import { useState } from "react";
import { RegisterFormValue } from "../../interfaces/registro";
import Footer from "../../components/Footer";

const RegisterPage: React.FC<any> = () => {

    const [userExists, setUserExists] = useState(false);
    const [successAlert, setSuccessAlert] = useState(false);
    const history = useHistory();
    const { register, handleSubmit, formState: { errors }, clearErrors, reset, setError } = useForm<RegisterFormValue>({
        defaultValues: {
            nombre: "",
            apellido: "",
            email: "",
            password: "",
            apodo: ""
        }
    });

    const goToLogin = () => {
        history.push("/login");
        reset();
    }

    const onSubmit = async (data: RegisterFormValue) => {
        console.log("registro", data)
        const register = await axiosRegister(data);
        if (register?.res) {
            if (userExists) setUserExists(false);
            reset();
            setSuccessAlert(true)
        } else {
            switch (register?.status) {
                case "El usuario ya existe":
                    setUserExists(true);
                    setError("email", {type:"custom", message: "El usuario ya existe"});
                    break;
            }
        }
    }

    const closeAlert = () => {
        setSuccessAlert(false);
        history.push("/login");
    }
    return (<IonPage>
                <IonContent>
                    <IonRow className="margin-row first-row">
                        <IonCol className="column__title" size="12">
                            <TennisBallComponent/>
                            <h2 className="column__title__label"> ¡ Registrate !</h2>
                            <TennisBallComponent/>
                        </IonCol>
                    </IonRow>
                    <form onSubmit={handleSubmit(onSubmit)}>
                    <IonRow>
                        <IonCol size="10" offset="1">
                            <IonItem fill="solid" >
                                <IonLabel position="floating">Nombre*</IonLabel>
                                <IonInput {...register("nombre", { required: true })} placeholder="Ingresa tu nombre"></IonInput>
                            </IonItem>
                            <div className="error-message" style={errors.nombre ? { opacity: 1 } : undefined}>
                                {errors.nombre?.type === 'required' && <p role="alert" className="error-alert">Debes ingresar tu nombre</p>}
                            </div>
                        </IonCol>
                    </IonRow>
                    <IonRow >
                        <IonCol size="10" offset="1">
                            <IonItem fill="solid" >
                                <IonLabel position="floating">Apellido*</IonLabel>
                                <IonInput {...register("apellido", { required: true })} placeholder="Ingresa tu apellido"></IonInput>
                            </IonItem>
                            <div className="error-message" style={errors.apellido ? { opacity: 1 } : undefined}>
                                {errors.apellido?.type === 'required' && <p role="alert" className="error-alert">Debes ingresar tu apellido</p>}
                            </div>
                        </IonCol>
                    </IonRow>
                    <IonRow >
                        <IonCol size="10" offset="1">
                            <IonItem fill="solid" >
                                <IonLabel position="floating">Email*</IonLabel>
                                <IonInput {...register("email", { required: true })} placeholder="Ingresa tu email"></IonInput>
                            </IonItem>
                            <div className="error-message" style={errors.email ? { opacity: 1 } : undefined}>
                                {errors.email?.type === 'required' && <p role="alert" className="error-alert">Debe ingresar un email</p>}
                            </div>
                        </IonCol>
                    </IonRow>
                    <IonRow >
                        <IonCol size="10" offset="1">
                            <IonItem fill="solid">
                                <IonLabel position="floating">Contrasena*</IonLabel>
                                <IonInput {...register("password", { required: true })} placeholder="Ingresa una contrasena"></IonInput>
                            </IonItem>
                            <div className="error-message" style={errors.password ? { opacity: 1 } : undefined}>
                                {errors.password?.type === 'required' && <p role="alert" className="error-alert">Debe ingresar una contrasena</p>}
                            </div>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol size="10" offset="1">
                            <IonItem fill="solid" >
                                <IonLabel position="floating">Apodo</IonLabel>
                                <IonInput {...register("apodo")} placeholder="Si deseas, ingresa un apodo"></IonInput>
                            </IonItem>
                        </IonCol>
                    </IonRow>
                    <IonRow className="margin-row">
                        <IonCol size="12" className="column__submit">
                            <IonButton type="submit" className="register-buttons">
                                        Enviar
                            </IonButton>
                        </IonCol>
                    </IonRow>
                    </form>
                    <IonRow>
                    <IonCol size="12" className="column__submit">
                            <IonButton className="register-buttons" fill="outline" onClick={goToLogin}>
                                        Atras
                            </IonButton>
                        </IonCol>
                    </IonRow>
                    <IonAlert
                    isOpen={successAlert}
                    onDidDismiss={closeAlert}
                    header="Bienvenido !"
                    subHeader="Te has registrado con exito!"
                    message="Ingresa y empeza a jugar!"
                    buttons={['OK']}
                />
                </IonContent>
                <Footer withBalls={false}/>
    </IonPage>)
};

export default RegisterPage;