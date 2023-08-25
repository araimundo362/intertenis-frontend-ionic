import axiosInstance from '.';
import { CATEGORIAS } from './constants';

export const getCategorias = async () => {
    try {
        const {data: categorias} = await axiosInstance.get(CATEGORIAS);
        return categorias;
    } catch (e) {
        console.error(e);
        return null;
    }
}