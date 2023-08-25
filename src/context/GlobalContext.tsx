import React, { useState, ReactNode, useEffect } from 'react';
import { Categoria } from '../interfaces/categoria';
import { getCategorias } from '../axios/categorias';

type GlobalContextProps = {
    children: ReactNode,
};

export const GlobalContext = React.createContext<{
    categorias: Categoria[]
}>({} as any);

export const GlobalContextProvider = ({ children }: GlobalContextProps) => {

    const [categorias, setCategorias] = useState<Categoria[]>([]);

    useEffect(() => {
        getCategorias().then((data: Categoria[]) => {
            setCategorias(data);
        });
    }, [])
    return <GlobalContext.Provider value={{ categorias }}>
        {children}
    </GlobalContext.Provider>
}