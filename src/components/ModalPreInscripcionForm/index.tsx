import { IonModal, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonContent, IonRow, IonCol, IonItem, IonLabel, IonInput, IonSelect, IonSelectOption } from "@ionic/react";
import { ModalPreInscripcionFormType } from "./types";
import { CATEGORIAS, EQUIPOS, ZONAS } from "../../constants/constants";
import { useForm } from "react-hook-form";
import { PreInscripcionFormValues } from "../../pages/PreInscripcion/PreInscripcion";

const ModalPreInscripcionForm: React.FC<ModalPreInscripcionFormType> = ({ isOpen, setIsOpenModal, jugador, setInscripcion }) => {

    const { register, formState: { errors }, handleSubmit, reset, setValue } = useForm<PreInscripcionFormValues>({
        defaultValues: {
            equipo: "",
            categoria: 0,
            zona: 0
        }
    });

    const closeModal = () => {
        reset();
        setIsOpenModal(false);
    }

    const onInscripcion = (inscripcionData: PreInscripcionFormValues) => {
        setInscripcion(inscripcionData);
        setValue("equipo", "");
        setValue("categoria", 0);
        setValue("zona", 0);
    }
      
    return <IonModal isOpen={isOpen}>
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>{jugador.nombre} {jugador.apellido}</IonTitle>
                            <IonButtons slot="end">
                                <IonButton onClick={closeModal}>Cerrar</IonButton>
                            </IonButtons>
                        </IonToolbar>
                </IonHeader>
                <IonContent>
                    <form onSubmit={handleSubmit(onInscripcion)}>
                        <IonRow >
                            <IonCol size="10" offset="1">
                                <IonItem fill="solid">
                                    <IonLabel position="stacked">Telefono*</IonLabel>
                                    <IonInput disabled={true} value={jugador.telefono}></IonInput>
                                </IonItem>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol size="10" offset="1">
                                <IonSelect {...register("equipo", {required: true})} placeholder="Equipo Superliga*">
                                    {EQUIPOS.map((elem) => <IonSelectOption value={elem.value}>{elem.opcion}</IonSelectOption>)}
                                </IonSelect>
                                <div className="error-message" style={errors.equipo ? { opacity: 1 } : undefined}>
                                    {errors.equipo?.type === 'required' && <p role="alert" className="error-alert">Debe seleccionar un equipo</p>}
                                </div>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol size="10" offset="1">
                                <IonSelect {...register("categoria", {required: true})} placeholder="Categoria *">
                                    {CATEGORIAS.map((elem) => <IonSelectOption value={elem.id}>{elem.categoria}</IonSelectOption>)}
                                </IonSelect>
                                <div className="error-message" style={errors.categoria ? { opacity: 1 } : undefined}>
                                    {errors.categoria?.type === 'required' && <p role="alert" className="error-alert">Debe seleccionar la categoria</p>}
                                </div>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol size="10" offset="1">
                                <IonSelect {...register("zona", {required: true})} placeholder="Zona *">
                                    {ZONAS.map((elem) => <IonSelectOption value={elem.id}>{elem.zona}</IonSelectOption>)}
                                </IonSelect>
                                <div className="error-message" style={errors.zona ? { opacity: 1 } : undefined}>
                                    {errors.zona?.type === 'required' && <p role="alert" className="error-alert">Debe seleccionar una zona</p>}
                                </div>
                            </IonCol>
                        </IonRow>
                        <IonButton color="primary" type="submit">Confirmar</IonButton>
                    </form>
        
                </IonContent>
        </IonModal>

}

export default ModalPreInscripcionForm;