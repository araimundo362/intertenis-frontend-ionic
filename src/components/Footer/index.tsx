import { IonFooter, IonImg } from "@ionic/react";
import TennisBallComponent from "../TennisBall";
import { useMobile } from "../../hooks/useMobile";
import RED from "../../assets/Red_.jpg";
import { FooterProps } from "./types";

import "./Footer.scss";

const Footer:React.FC<FooterProps> = ({ withBalls = true }) => {

    const isMobile = useMobile();

    return <IonFooter className="footer">
        {withBalls &&  <div className="tennis-balls-container">
                            <TennisBallComponent />
                            <TennisBallComponent />
                            <TennisBallComponent />
                        </div>    }                
    {isMobile && <IonImg src={RED} alt="Red" className="footer__net-img" />}
</IonFooter>;
};

export default Footer;