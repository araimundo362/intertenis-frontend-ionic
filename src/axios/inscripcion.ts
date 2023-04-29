import axiosInstance from '.';
import { InscripcionFormValues } from '../interfaces/inscripcion';
import { LIGA_INSCRIPCION } from './constants';

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

