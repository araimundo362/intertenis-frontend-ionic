import { IonFooter, IonToolbar} from "@ionic/react";
import TennisBallComponent from "../TennisBall";
import { FooterProps } from "./types";

import "./Footer.scss";

const Footer:React.FC<FooterProps> = ({ withBalls = true }) => {

    return <IonFooter collapse="fade" className="footer ion-no-border">
        <IonToolbar className="toolbar-background">
                        <h1 className="row-title__title">LA LIGA</h1>
                        <h4 className="row-title__subtitle">La original, la primera</h4>
        </IonToolbar>
        {withBalls &&  <div >
                            <TennisBallComponent />
                            <TennisBallComponent />
                            <TennisBallComponent />
                        </div>    }                
        </IonFooter>;
};

export default Footer;