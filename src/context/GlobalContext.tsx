import React, { useState, ReactNode, useEffect } from 'react';
import { Categoria } from '../interfaces/categoria';
import { getCategorias } from '../axios/categorias';
import { ResultadosResponse } from '../interfaces/resultado';
import { obtenerResultados } from '../axios/resultados';

type GlobalContextProps = {
    children: ReactNode,
};

export const GlobalContext = React.createContext<{
    categorias: Categoria[],
    resultados: ResultadosResponse[]
}>({} as any);

export const GlobalContextProvider = ({ children }: GlobalContextProps) => {

    const [categorias, setCategorias] = useState<Categoria[]>([]);

    const [resultados, setResultados] = useState<ResultadosResponse[]>([]);

    useEffect(() => {
        getCategorias().then((data: Categoria[]) => {
            setCategorias(data);
        });
        obtenerResultados().then((data: ResultadosResponse[]) => setResultados(data));
    }, []);
    
    return <GlobalContext.Provider value={{ categorias, resultados }}>
        {children}
    </GlobalContext.Provider>
}