import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ResultadosContext } from "../../context/ResultadosContext";

import "./CargarResultadoComponent.scss";
import EleccionJugadorForm from "../EleccionJugadorForm";
import ResultadoForm from "../ResultadoForm";
import FechaForm from "../FechaForm";
import CheckpointResultado from "../CheckpointResultado";

const CargarResultadoComponent: React.FC = () => {
    const { step } = useContext(ResultadosContext);
    const { userData, categoria } = useContext(AuthContext);

    return <>
        {step === 1 && <EleccionJugadorForm categoria={categoria} idJugador={userData._id} />}
        {step === 2 && <ResultadoForm />}
        {step === 3 && <FechaForm />}
        {step === 4 && <CheckpointResultado />}

    </>
}

export default CargarResultadoComponent;