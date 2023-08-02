import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { PRE_INSCRIPCIONES } from '../axios/constants';
import { getPreInscripcion } from '../axios/inscripcion';
import { PreInscripcion } from '../interfaces/inscripcion';

export const usePreInscripcion = () => {

    const [listadoPreInscripcion, setListadoPreInscripcion] = useState<PreInscripcion[]>([]);

    const { data, mutate, error, isLoading } = useSWR(PRE_INSCRIPCIONES, getPreInscripcion, {
        shouldRetryOnError: false,
      });

    useEffect(() => {
      if (data !== undefined) setListadoPreInscripcion(data.listadoPreInscriptos);
    }, [data]);

    return {data, mutate, error, isLoading, listadoPreInscripcion}
};