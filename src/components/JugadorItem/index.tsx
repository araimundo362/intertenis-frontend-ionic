import { IonButton, IonIcon, IonItem } from "@ionic/react";
import { createOutline, tennisball } from "ionicons/icons";
import { JugadorItemProps } from "./types";

const JugadorItem: React.FC<JugadorItemProps> = ({nombre, apellido, telefono, buttonAction, iconButton}) => {

    return <IonItem lines="full" className="preinscripcion-item">
                <div className="preinscripcion-item__content">
                    <div className="preinscripcion-item__container-one">
                        <IonIcon icon={tennisball}  size="large" className="size-ball"/>
                        <div>
                            <h5 className="jugador-item__label-nombre">{nombre} {apellido}</h5>
                            <h6 className="jugador-item__label-telefono">Tel: {telefono}</h6>
                        </div>
                    </div>
                    <IonButton className="preinscripcion-item__button" onClick={buttonAction}>
                        <IonIcon className="preinscripcion-item__button__icon" slot="icon-only" icon={iconButton} color="primary"></IonIcon>
                    </IonButton>
                </div>
            </IonItem>
};

export default JugadorItem;

/* <IonButton className="preinscripcion-item__button" onClick={() => setModalDataInscripcion(index)}>
icon={createOutline}

*/