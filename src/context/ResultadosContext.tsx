import React, { useState, ReactNode } from 'react';
import { InfoJugador } from '../interfaces/resultado';

type ResultadosContextProps = {
    children: ReactNode,
};

export const ResultadosContext = React.createContext<{
    step: number,
    setStep: React.Dispatch<React.SetStateAction<number>>,
    nextStep: () => void,
    prevStep: () => void,
    setRival: React.Dispatch<React.SetStateAction<InfoJugador>>,
    rival: InfoJugador,
    resultado: string,
    setResultado: React.Dispatch<React.SetStateAction<string>>,
    status: "GANE" | "PERDI" | undefined,
    setStatus: React.Dispatch<React.SetStateAction<"GANE" | "PERDI" | undefined>>
    fecha: string,
    setFecha: React.Dispatch<React.SetStateAction<string>>
}>({} as any);

export const ResultadosContextProvider = ({ children } : ResultadosContextProps) => {

    const [step, setStep] = useState(1); // step 1 --> Elegir Rival (indico la zona del jugador ?)+ Indicar si ganaste o perdiste
                                         // step 2 --> Ingresar resultado con el formato indicado
                                         // step 3 --> Ingresar la fecha del partido             
    
    const [resultado, setResultado] = useState("");
    const [status, setStatus] = useState<"GANE" | "PERDI">();

    const [fecha, setFecha] = useState<string>("");

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);
    
    const [rival, setRival] = useState<InfoJugador>({_id: "", nombre: ""});

    return <ResultadosContext.Provider value={{
        step,
        setStep,
        nextStep,
        prevStep,
        setRival,
        rival,
        resultado,
        setResultado,
        status,
        setStatus,
        fecha,
        setFecha
    }}>
        {children}
    </ResultadosContext.Provider>
}
