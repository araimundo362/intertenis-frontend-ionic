import { useState } from "react";
import { IonAlert, IonButton, IonCol, IonContent, IonInput, IonItem, IonLabel, IonPage, IonRow } from "@ionic/react";
import { useHistory } from "react-router";
import { useForm } from "react-hook-form";

import { RegisterFormValue } from "../../interfaces/registro";
import TennisBallComponent from "../../components/TennisBall";
import Footer from "../../components/Footer";

import "./Register.scss";
import { useAuth } from "../../hooks/useAuth";

const RegisterPage: React.FC<any> = () => {

    const [successAlert, setSuccessAlert] = useState(false);
    const history = useHistory();

    const { onRegister } = useAuth();
    const { register, handleSubmit, formState: { errors }, reset, setError } = useForm<RegisterFormValue>({
        defaultValues: {
            nombre: "",
            apellido: "",
            email: "",
            password: "",
            apodo: "",
            telefono: ""
        }
    });

    const goToLogin = () => {
        history.push("/login");
        reset();
    }

    const onSubmit = async (data: RegisterFormValue) => {
        const resp = await onRegister(data);
        if (resp.res) {
            reset();
            setSuccessAlert(true);
        } else {
            switch (resp.status) {
                case "El usuario ya existe":
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
                                <IonLabel position="floating">Telefono*</IonLabel>
                                <IonInput {...register("telefono", { required: true })} placeholder="Ingresa un numero de telefono"></IonInput>
                            </IonItem>
                            <div className="error-message" style={errors.email ? { opacity: 1 } : undefined}>
                                {errors.telefono?.type === 'required' && <p role="alert" className="error-alert">Debe ingresar un telefono</p>}
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
                                {errors.email && <p role="alert" className="error-alert">{errors.email.message}</p>}
                            </div>
                        </IonCol>
                    </IonRow>
                    <IonRow >
                        <IonCol size="10" offset="1">
                            <IonItem fill="solid">
                                <IonLabel position="floating">Contrasena*</IonLabel>
                                <IonInput {...register("password", { required: true })} placeholder="Ingresa una contrasena" type="password"></IonInput>
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
                <Footer withBalls={true} withTitle={false}/>
    </IonPage>)
};

export default RegisterPage;