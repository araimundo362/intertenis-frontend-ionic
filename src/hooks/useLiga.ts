import { useState } from "react"
import { axiosGetTablaPosiciones, getPlayersByCategory } from "../axios/liga";
import { Jugador } from "../interfaces/user";
import { ConfirmacionResultado, ResultadoRequest } from "../interfaces/resultado";
import { axiosCargarResultado, axiosConfirmarResultado } from "../axios/resultados";
import { ZonasJugadores } from "../interfaces/posiciones";

export const useLiga = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [players, setPlayers] = useState<Jugador[]>([]);

    const [alertaResultadoPendienteConfirmacion, setAlertaResultadoPendienteConfirmacion] = useState(false);
    const [alertaResultadoConfirmado, setAlertaResultadoConfirmado] = useState(false);
    const [alertaResultadoDiscrepancia, setAlertaResultadoDiscrepancia] = useState(false);


    const getRivals = async (categoria: number) => {
        setIsLoading(true);
        try {
            const jugadores: Jugador[] = await getPlayersByCategory(categoria);
            if (jugadores) {
                
                setPlayers(jugadores);
                setIsLoading(false);
            } 
        } catch (e) {
            console.error(e)
        }
    }
    
    const cargarResultado = async (resultado: ResultadoRequest) => {
        const response = await axiosCargarResultado(resultado);

        switch (response) {
            case "FIRST_RESULT_SUCCESS":
                setAlertaResultadoPendienteConfirmacion(true);
                break;
            case "RESULT_CONFIRMED":
                setAlertaResultadoConfirmado(true);
                break;
            case "RESULT_NOT_EQUAL":
                setAlertaResultadoDiscrepancia(true);
                break;
            }
    }

    const getPosiciones = async (categoria: number) => {
        setIsLoading(true);
        try {
            const table: ZonasJugadores[] = await axiosGetTablaPosiciones(categoria);

            return table;
        } catch (e) {
            console.error(e);
            return []
        }
   }
   
   const confirmarResultado = async (resultadoConfirmado: ConfirmacionResultado) => {
        await axiosConfirmarResultado(resultadoConfirmado);
        return "CONFIRM";
   }

    return {
        isLoading,
        setIsLoading,
        getRivals,
        players,
        cargarResultado,
        alertaResultadoConfirmado,
        alertaResultadoPendienteConfirmacion,
        alertaResultadoDiscrepancia,
        getPosiciones,
        confirmarResultado
    }
}