import { IonModal, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonContent, IonRow, createAnimation, IonCol, IonItem, IonLabel, IonInput, IonSelect, IonSelectOption } from "@ionic/react";
import { ModalPreInscripcionFormType } from "./types";
import { EQUIPOS, ZONAS } from "../../constants/constants";
import { useForm } from "react-hook-form";
import { PreInscripcionFormValues } from "../../pages/PreInscripcion/PreInscripcion";
import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";

import "./ModalPreInscripcionForm.scss";

const ModalPreInscripcionForm: React.FC<ModalPreInscripcionFormType> = ({ isOpen, setIsOpenModal, jugador, setInscripcion }) => {

    const { register, formState: { errors }, handleSubmit, reset, setValue } = useForm<PreInscripcionFormValues>({
        defaultValues: {
            equipo: "",
            categoria: 0,
            zona: 0,
            estadoInscripcion: ""
        }
    });

    const { categorias } = useContext(GlobalContext);
    
    const closeModal = () => {
        reset();
        setIsOpenModal(false);
    }

    const onInscripcion = (inscripcionData: PreInscripcionFormValues) => {
        setInscripcion(inscripcionData);
        setValue("equipo", "");
        setValue("categoria", 0);
        setValue("zona", 0);
        setValue("estadoInscripcion", inscripcionData.estadoInscripcion);
    }
      

    const enterAnimation = (baseEl: HTMLElement) => {
        const root = baseEl.shadowRoot;
    
        const backdropAnimation = createAnimation()
          .addElement(root?.querySelector('ion-backdrop')!)
          .fromTo('opacity', '0.01', 'var(--backdrop-opacity)');
    
        const wrapperAnimation = createAnimation()
          .addElement(root?.querySelector('.modal-wrapper')!)
          .keyframes([
            { offset: 0, opacity: '0', transform: 'scale(0)' },
            { offset: 1, opacity: '0.99', transform: 'scale(1)' },
          ]);
    
        return createAnimation()
          .addElement(baseEl)
          .easing('ease-out')
          .duration(500)
          .addAnimation([backdropAnimation, wrapperAnimation]);
      };
    
      const leaveAnimation = (baseEl: HTMLElement) => {
        return enterAnimation(baseEl).direction('reverse');
      };

    return <IonModal isOpen={isOpen} initialBreakpoint={0.8} breakpoints={[0, 0.8, 1]} enterAnimation={enterAnimation} leaveAnimation={leaveAnimation}>
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>{jugador.nombre} {jugador.apellido}</IonTitle>
                            <IonButtons slot="end">
                                <IonButton onClick={closeModal}>Cerrar</IonButton>
                            </IonButtons>
                        </IonToolbar>
                </IonHeader>
                <IonContent className="content-modal">
                    <form onSubmit={handleSubmit(onInscripcion)} className="margin10">
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
                                <IonSelect className="select-modal" {...register("equipo", {required: true})} placeholder="Equipo Superliga*">
                                    {EQUIPOS.map((elem) => <IonSelectOption key={elem.value} value={elem.value}>{elem.opcion}</IonSelectOption>)}
                                </IonSelect>
                                <div className="error-message" style={errors.equipo ? { opacity: 1 } : undefined}>
                                    {errors.equipo?.type === 'required' && <p role="alert" className="error-alert">Debe seleccionar un equipo</p>}
                                </div>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol size="10" offset="1">
                                <IonSelect className="select-modal" {...register("categoria", {required: true})} placeholder="Categoria *">
                                {categorias.map((cat) => <IonSelectOption key={cat.numero} value={cat.numero}>{cat.categoria}</IonSelectOption>)}
                                </IonSelect>
                                <div className="error-message" style={errors.categoria ? { opacity: 1 } : undefined}>
                                    {errors.categoria?.type === 'required' && <p role="alert" className="error-alert">Debe seleccionar la categoria</p>}
                                </div>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol size="10" offset="1">
                                <IonSelect className="select-modal" {...register("zona", {required: true})} placeholder="Zona *">
                                    {ZONAS.map((elem) => <IonSelectOption key={elem.id} value={elem.id}>{elem.zona}</IonSelectOption>)}
                                </IonSelect>
                                <div className="error-message" style={errors.zona ? { opacity: 1 } : undefined}>
                                    {errors.zona?.type === 'required' && <p role="alert" className="error-alert">Debe seleccionar una zona</p>}
                                </div>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol size="10" offset="1">
                                <IonSelect className="select-modal" {...register("estadoInscripcion", {required: true})} placeholder="Estado de Inscripcion *">
                                    <IonSelectOption value="INSCRIPTO">Confirmar</IonSelectOption>
                                    <IonSelectOption value="RECHAZADO">Rechazar</IonSelectOption>
                                </IonSelect>
                                <div className="error-message" style={errors.estadoInscripcion ? { opacity: 1 } : undefined}>
                                    {errors.estadoInscripcion?.type === 'required' && <p role="alert" className="error-alert">Debe confirmar o rechazar la inscripcion</p>}
                                </div>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol className="justify-content-button">
                                <IonButton color="primary" type="submit">Confirmar</IonButton>
                            </IonCol>
                        </IonRow>
                    </form>
        
                </IonContent>
        </IonModal>

}

export default ModalPreInscripcionForm;