import axiosInstance from '.';
import { JUGADORES, TABLA_POSICIONES } from './constants';

export const getPlayersByCategory = async (categoria: number | undefined) => {
    try {
        const {data: jugadores} = await axiosInstance.get(JUGADORES + `/${categoria}`);
        return jugadores;
    } catch (e) {
        console.error(e);
        return null
    }
}

export const axiosGetTablaPosiciones = async (categoria: number) => {
    try {
        const { data: tabla} = await axiosInstance.get(TABLA_POSICIONES + `/${categoria}` )
        return tabla
    } catch (e) {
        console.error(e);
    }
}