import React, { useState, ReactNode, useEffect, useContext } from 'react';
import { JugadorData } from '../interfaces/user';

type AuthContextProps = {
    children: ReactNode,
  };

export const AuthContext = React.createContext<{
    isLoggedIn: boolean,
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>,
    isLoadingPersonalData: boolean,
    userData: JugadorData,
    setUserData: React.Dispatch<React.SetStateAction<any>>,
    inscripcion: boolean,
    setInscripcion: React.Dispatch<React.SetStateAction<boolean>>,
    categoria: number,
    setCategoria: React.Dispatch<React.SetStateAction<number>>,
    equipo: string,
    setEquipo: React.Dispatch<React.SetStateAction<string>>
}>({} as any);

export const AuthContextProvider = ({ children }: AuthContextProps) => {
    
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoadingPersonalData, setIsLoadingPersonalData] = useState(false);

    const [userData, setUserData] = useState<JugadorData>({
      nombre: "",
      apellido: "",
      email: "",
      isAdmin: false,
    //  inscripcion: false,
      apodo: "",
      _id: ""
    });

    const [inscripcion, setInscripcion] = useState(false);
    const [categoria, setCategoria] = useState(0);

    const [equipo, setEquipo] = useState("");
    
    useEffect(() => {
      if (isLoggedIn) {
        setIsLoadingPersonalData(true);
      }
    }, [isLoggedIn]);

    return (<AuthContext.Provider value={{
                                        isLoggedIn,
                                        setIsLoggedIn,
                                        isLoadingPersonalData,
                                        userData,
                                        setUserData,
                                        inscripcion,
                                        setInscripcion,
                                        categoria, 
                                        setCategoria, 
                                        equipo,
                                        setEquipo
                                      }}
        >
          {children}
        </AuthContext.Provider>
      );    
}