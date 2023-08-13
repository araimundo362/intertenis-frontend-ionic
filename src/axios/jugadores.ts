import axiosInstance from '.';
import { JugadorInscripto } from '../interfaces/inscripcion';
import { ASIGNAR_EQUIPO, BORRAR_JUGADOR, JUGADORES } from './constants';

export const getAllPlayers = async () => {
    try {
        const { data: jugadores} = await axiosInstance.get<JugadorInscripto[]>(JUGADORES);
      console.log("veo jugadores recibidos", jugadores);
      return jugadores;
    } catch (e) {
      console.error(e);
    }
  }

export const borrarJugadorLiga = async (id: string) => {
  try { 
    const prueba = await axiosInstance.post(BORRAR_JUGADOR, { id } );
    console.log("prueba", prueba)
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
}

export const asignarNuevoEquipo = async (id:string, equipo: string) => {
  try {
    const asignacion = await axiosInstance.post(ASIGNAR_EQUIPO, {id, equipo});
    console.log("asignacion", asignacion);
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
}