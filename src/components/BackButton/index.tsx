import { IonIcon } from "@ionic/react";
import { arrowBack } from "ionicons/icons";
import { useHistory } from "react-router";
import { BackButtonProps } from "./types";

const BackButton: React.FC<BackButtonProps> = ({color}) => {

    const history = useHistory();

    const goBack = () => {
        history.goBack();
    };
    
    return <IonIcon icon={arrowBack}  size="large" color={color} onClick={goBack}/>
};

export default BackButton;