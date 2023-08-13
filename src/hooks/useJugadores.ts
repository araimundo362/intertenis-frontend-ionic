import { useEffect, useState } from "react";
import { asignarNuevoEquipo, borrarJugadorLiga, getAllPlayers } from "../axios/jugadores";
import { Jugador } from "../interfaces/user";
import { JugadorInscripto } from "../interfaces/inscripcion";


export const useJugadores = () => {

        const [isLoading, setIsLoading] = useState(false);
        const [jugadores, setJugadores] = useState<JugadorInscripto[]>([]);

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
            const resp = await asignarNuevoEquipo(idJugador, equipo);
            console.log("resp", resp);
            return true;
        } catch (e) {
            console.error(e);
            return false;
        }
    }

    const borrarJugador = async (id: string) => {
        setIsLoading(true);
        try {
            console.log("bla bla");
            const borrar = await borrarJugadorLiga(id);

            console.log("que onda esto", borrar);
            setIsLoading(false);
            if (borrar) return true;
        } catch (e) {
            console.log("esto se ejecuta????")
            console.error(e);
            setIsLoading(false);
            return false
        }  
    }

    useEffect(() => {
        getJugadores().then((jug) => {
            if (jug) {
                console.log("jug", jug);
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