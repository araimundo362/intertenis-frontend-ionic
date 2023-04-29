import { IonHeader, IonButton, IonIcon } from "@ionic/react";
import { arrowBack } from "ionicons/icons";
import { HeaderPropsType } from "./types";

const Header: React.FC<HeaderPropsType> = ({label, action}) => {

    return <IonHeader className="header-inscripcion">
                <div className="header-inscripcion__container">
                 <IonButton className="header__arrow-back-button" onClick={action}>
                                                <IonIcon slot="icon-only" icon={arrowBack}></IonIcon>
                                            </IonButton>
                    <h3 className="header__container__label">{label}</h3>
                </div>
</IonHeader>
}

export default Header;