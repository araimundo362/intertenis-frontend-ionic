import { IonButton } from "@ionic/react";
import { useHistory } from "react-router-dom";

import { HomeButtonProps } from "./types";

import "./HomeButton.scss";
import TennisBallComponent from "../TennisBall";

const HomeButton: React.FC<HomeButtonProps> = ({label, link, disabled}) => {

    const history = useHistory();

    const redirectTo = () => {
        history.push(link);
    }

    return <IonButton shape="round" className="home-buttons" onClick={redirectTo} disabled={disabled}>
            <div className="home-buttons__content">
                {label}
                <TennisBallComponent />
            </div>
        </IonButton>
};

export default HomeButton;