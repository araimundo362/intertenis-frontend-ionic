import { useContext, useState } from "react";
import { axiosLogin } from "../axios/auth";
import { UNKNOWN, USER_NOT_FOUND } from "../constants/constants";
import { AuthContext } from "../context/AuthContext";
import { JugadorData } from "../interfaces/user";

export const useAuth = () => {

    const { setUserData, setInscripcion, setCategoria, setEquipo } = useContext(AuthContext);

    const [isLoading, setIsLoading] = useState(false);

    const login = async (email: string, password: string) => {
        setIsLoading(true);
            const {status, data, res} = await axiosLogin(email, password);
            
            console.log("veo data", data)
            if (res) {
                const user: JugadorData = {
                    apodo: data.apodo,
                    apellido: data.apellido,
                    nombre: data.nombre,
                    email: data.email,
                    isAdmin: data.isAdmin,
                    _id: data._id
                };
                setUserData(user);
                setInscripcion(data.inscripcion);
                setCategoria(data.categoria);
                setEquipo(data.equipo);

        }
            return status
    };

    return {
        isLoading,
        login
    }
};