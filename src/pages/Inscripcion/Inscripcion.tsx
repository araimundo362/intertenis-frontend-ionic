import { IonButton, IonCol, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonPage, IonRow, IonSelect, IonSelectOption } from "@ionic/react";
import { arrowBack } from "ionicons/icons";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { addInscripto } from "../../axios/inscripcion";
import Alert from "../../components/Alert";
import { AuthContext } from "../../context/AuthContext";
import { InscripcionFormValues } from "../../interfaces/inscripcion";

import "./Inscripcion.scss"
import Header from "../../components/Header";

const InscripcionPage: React.FC = () => {

    const history = useHistory();
    
    const {userData } = useContext(AuthContext);

    const [alertOpen, setAlertOpen] = useState(false);
    const [showToast, setShowToast] = useState(false); // Toast para fallas de api-inscripcion

    const { register, formState: { errors }, handleSubmit } = useForm<InscripcionFormValues>({
        defaultValues: {
            nombre: userData.nombre,
            apellido: userData.apellido,
            telefono: userData.telefono
        }
    });
    
    const goBack = () => {
        history.goBack();
    }

    const onInscripcion = async (data: InscripcionFormValues) => {
        const inscripto = {...data, _id: userData._id};
        const res =  await addInscripto(inscripto);
        if (res) {
            setAlertOpen(true);
        } else {
            setShowToast(true);
        }
    }

    const onCloseAlert = () => {
        history.push("/home");
    }

    return <IonPage>
                <Header label="Inscripcion" action={goBack}/>
                <IonContent className="background-home">
                <form className="inscripcionContent" onSubmit={handleSubmit(onInscripcion)}>
                <IonRow>
                        <IonCol size="10" offset="1">
                            <IonItem fill="solid">
                                <IonLabel position="stacked">Nombre*</IonLabel>
                                <IonInput {...register("nombre", { required: true })} disabled={true}></IonInput>
                            </IonItem>
                        </IonCol>
                    </IonRow>
                    <IonRow >
                        <IonCol size="10" offset="1">
                            <IonItem fill="solid">
                                <IonLabel position="stacked">Apellido*</IonLabel>
                                <IonInput {...register("apellido", { required: true })} disabled={true}></IonInput>
                            </IonItem>
                        </IonCol>
                    </IonRow>
                    <IonRow >
                        <IonCol size="10" offset="1">
                            <IonItem fill="solid">
                                <IonLabel position="stacked">Telefono*</IonLabel>
                                <IonInput {...register("telefono", { required: true })} disabled={true}></IonInput>
                            </IonItem>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol size="6" offset="3">
                            <IonButton type="submit">Inscribirme</IonButton>
                        </IonCol>
                    </IonRow>
                </form>
                <Alert isOpen={alertOpen} closeAlert={onCloseAlert} header="Fantastico !" subHeader="Te has anotado a la liga!" message="Comunicate con German Diaz para confirmar la inscripcion!"  buttons={["Ok!"]}/>
                </IonContent>
    </IonPage>
};

export default InscripcionPage;

/*<div className="error-message" style={errors.password ? { opacity: 1 } : undefined}>
                                {errors.password?.type === 'required' && <p role="alert" className="error-alert">Debe ingresar una contrasena</p>}
                            </div>
                            
                            
                            <IonHeader className="header-inscripcion">
                    <div className="header-inscripcion__container">
                        <IonButton className="header__arrow-back-button">
                            <IonIcon slot="icon-only" icon={arrowBack} onClick={goBack}></IonIcon>
                        </IonButton>
                        <h3 className="header__container__label">Inscripcion</h3>
                    </div>
                </IonHeader>*/