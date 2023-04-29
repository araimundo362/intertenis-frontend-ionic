import axiosInstance from '.';
import { ConfirmacionResultado, ResultadoRequest } from '../interfaces/resultado';
import { CONFIRMACION_RESULTADO, RESULTADOS } from './constants';

export const axiosCargarResultado = async (resultado: ResultadoRequest) => {
    try {
        const res = await axiosInstance.post(RESULTADOS, resultado);
        return res.data;
    } catch (e) {
        console.error(e);
        return false;
    }
}

export const axiosConfirmarResultado = async (confirmacionResultado: ConfirmacionResultado) => {
    try {
        const res = await axiosInstance.post(CONFIRMACION_RESULTADO, confirmacionResultado);
        return res.data;
    } catch (e) {
        console.error(e);
        return false;
    }
}