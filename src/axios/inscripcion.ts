import axiosInstance from '.';
import { InscripcionFormValues, PreInscripcion } from '../interfaces/inscripcion';
import { CHECK_INSCRIPCION, CONFIRMAR_INSCRIPCION, LIGA_INSCRIPCION, PRE_INSCRIPCIONES } from './constants';

export const addInscripto = async (body: InscripcionFormValues) => {
  try {
    await axiosInstance.post(LIGA_INSCRIPCION, body);
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export const getInscripto = async (id: string) => {
  try {
    const inscripto = await axiosInstance.get(LIGA_INSCRIPCION, {
      params: id
    });
    return inscripto;
  } catch (e) {
    console.error(e);
  }
}

export const getPreInscripcion = async () => {
  try {
    const {data: preInscripciones} = await axiosInstance.get(PRE_INSCRIPCIONES);
    
    return preInscripciones; 
  } catch (e) {
    console.error(e);
  }
}

export const confirmarInscripcion = async (jugadores: PreInscripcion[]) => {
  try {
    await axiosInstance.post(CONFIRMAR_INSCRIPCION, jugadores);
    return true;
  } catch (e) {
    console.error(e);
  }
}

export const checkMyInscripcion = async (id: string) => {
  try {
    const {data: inscripcion} = await axiosInstance.get(CHECK_INSCRIPCION + `/${id}`)
    return inscripcion;
  } catch (e) {
    console.error(e);
    return false;
  }
}