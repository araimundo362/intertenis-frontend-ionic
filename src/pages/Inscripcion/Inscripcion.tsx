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
    
    const {userData, setInscripcion, setCategoria, setEquipo} = useContext(AuthContext);

    const [alertOpen, setAlertOpen] = useState(false);
    const [showToast, setShowToast] = useState(false); // Toast para fallas de api-inscripcion

    const { register, formState: { errors }, handleSubmit } = useForm<InscripcionFormValues>({
        defaultValues: {
            nombre: userData.nombre,
            apellido: userData.apellido,
            equipo: "",
            categoria: "",
            zona: ""
        }
    });
    
    const goBack = () => {
        history.goBack();
    }

    const onInscripcion = async (data: InscripcionFormValues) => {
        const inscripto = {...data, _id: userData._id};
        console.log("inscripto", inscripto)
        console.log("lo veo desde data", data.equipo)
        const res =  await addInscripto(inscripto);
        if (res) {
            setAlertOpen(true);
            setInscripcion(true);
            setCategoria(Number(data.categoria));
            setEquipo(data.equipo)
        } else {
            setShowToast(true);
        }
    }

    const onCloseAlert = () => {
        history.push("/home");
    }

    return <IonPage>
                <Header label="Inscripcion" action={goBack}/>
                <IonContent>
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
                    <IonRow>
                        <IonCol size="10" offset="1">
                            <IonItem fill="solid">
                                <IonSelect {...register("categoria", {
                                    required: "Se debe ingresar la categoria"
                                })} className="select" placeholder="Categoria*" interface="popover">
                                    <IonSelectOption value={1}>1ra</IonSelectOption>
                                    <IonSelectOption value={2}>2da</IonSelectOption>
                                    <IonSelectOption value={3}>3ra</IonSelectOption>
                                    <IonSelectOption value={4}>4ta</IonSelectOption>
                                    <IonSelectOption value={5}>5ta</IonSelectOption>
                                    <IonSelectOption value={6}>6ta</IonSelectOption>
                                    <IonSelectOption value={7}>7ma</IonSelectOption>
                                    <IonSelectOption value={8}>8va</IonSelectOption>
                                    <IonSelectOption value={9}>9na</IonSelectOption>
                                </IonSelect>
                            </IonItem>
                            {errors.categoria && <p> {errors.categoria.message} </p>}

                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol size="10" offset="1">
                            <IonItem fill="solid">
                                <IonSelect {...register("zona", {
                                    required: "Se debe ingresar la zona a anotarse"
                                })} className="select" placeholder="Zona*" interface="popover">
                                    <IonSelectOption value="A">A</IonSelectOption>
                                    <IonSelectOption value="B">B</IonSelectOption>
                                    <IonSelectOption value="C">C</IonSelectOption>
                                    <IonSelectOption value="D">D</IonSelectOption>
                                </IonSelect>
                            </IonItem>
                            {errors.zona && <p> {errors.zona.message} </p>}

                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol offset="1" size="10">
                            <IonItem fill="solid">
                                <IonSelect {...register("equipo", {
                                    required: "Se debe elegir un equipo"
                                })} className="select" placeholder="Equipo*" interface="action-sheet">
                                    <IonSelectOption value="LAKEMO">Lakemo</IonSelectOption>
                                    <IonSelectOption value="MELABANKO">Melabanko</IonSelectOption>
                                    <IonSelectOption value="MURO">Muro</IonSelectOption>
                                    <IonSelectOption value="NUNKAFUERA">Nunkafuera</IonSelectOption>
                                </IonSelect>
                            </IonItem>
                            {errors.equipo && <p> {errors.equipo.message} </p>}
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol size="6" offset="3">
                            <IonButton type="submit">Inscribirme</IonButton>
                        </IonCol>
                    </IonRow>
                </form>
                <Alert isOpen={alertOpen} closeAlert={onCloseAlert} header="Fantastico !" message="Te has anotado a la liga!" buttons={["Ok!"]}/>
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