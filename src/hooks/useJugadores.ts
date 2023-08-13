import { useEffect, useState } from "react";
import { asignarNuevoEquipo, borrarJugadorLiga, getAllPlayers } from "../axios/jugadores";
import { JugadorInscripto } from "../interfaces/inscripcion";


export const useJugadores = () => {

        const [isLoading, setIsLoading] = useState(false);

        const [jugadoresInscriptos, setJugadoresInscriptos] = useState<JugadorInscripto[]>([]);
        const [jugadoresRechazados, setJugadoresRechazados] = useState<JugadorInscripto[]>([]);

    const getJugadores = async () => {
        setIsLoading(true);
        try {
            const res = await getAllPlayers();
            console.log("res", res);
            if (res) {
                setIsLoading(false);
                return res;
            }
        } catch (e) {
            console.error(e);
        }
    }

    const asignarEquipo = async (idJugador: string, equipo: string) => {
        try {
            await asignarNuevoEquipo(idJugador, equipo);
            return true;
        } catch (e) {
            console.error(e);
            return false;
        }
    }

    const borrarJugador = async (id: string) => {
        setIsLoading(true);
        try {
            const borrar = await borrarJugadorLiga(id);
            setIsLoading(false);
            if (borrar) return true;
        } catch (e) {
            console.error(e);
            setIsLoading(false);
            return false
        }  
    }

    useEffect(() => {
        getJugadores().then((jug) => {
            if (jug) {
                setJugadoresInscriptos(jug.filter((jugador) => jugador.estado === "INSCRIPTO"))
                setJugadoresRechazados(jug.filter((jugador) => jugador.estado === "RECHAZADO"))
            }
        });
    }, []);

    return {
        getJugadores,
        borrarJugador,
        isLoading,
        jugadoresInscriptos,
        jugadoresRechazados,
        asignarEquipo
    }
}