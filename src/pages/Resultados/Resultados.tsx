import { IonContent, IonPage } from "@ionic/react";
import { useContext } from "react";
import { useHistory } from "react-router";
import CargarResultadoComponent from "../../components/CargarResultadoComponent";
import { AuthContext } from "../../context/AuthContext";
import { ResultadosContextProvider } from "../../context/ResultadosContext";
import Header from "../../components/Header";
import DefinirComponent from "../../components/DefinirResultado";

const ResultadoPage: React.FC = () => {

    const { userData } = useContext(AuthContext);
    const history = useHistory();

    const goBack = () => {
        history.push("/home")
    }
    
    const isNotAdmin = <ResultadosContextProvider>
                            <CargarResultadoComponent />
                        </ResultadosContextProvider>;

    const adminComponent = <DefinirComponent />
    return <IonPage>
            <Header label="Cargar Resultado" action={goBack} />
                <IonContent className="background-home">
                    {userData.isAdmin ? adminComponent : isNotAdmin}
                </IonContent>
    </IonPage>
};

export default ResultadoPage;