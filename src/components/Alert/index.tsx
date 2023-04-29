import { IonAlert } from "@ionic/react";
import { AlertProps } from "./types";

const Alert: React.FC<AlertProps> = ({isOpen, closeAlert, header, message, buttons, subHeader = ""}) => {

    return <IonAlert
                isOpen={isOpen}
                onDidDismiss={closeAlert}
                header={header}
                subHeader={subHeader}
                message={message}
                buttons={buttons}
/>
}

export default Alert;

/*
return <IonAlert
    isOpen={isOpen}
    onDidDismiss={closeAlert}
    header="Bienvenido !"
    subHeader="Te has registrado con exito!"
    message="Ingresa y empeza a jugar!"
    buttons={['OK']}
/>*/