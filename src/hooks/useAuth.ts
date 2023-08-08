import { useContext, useState } from "react";
import { axiosLogin, axiosRegister } from "../axios/auth";
import { UNKNOWN } from "../constants/constants";
import { AuthContext } from "../context/AuthContext";
import { JugadorData } from "../interfaces/user";
import { LoginResponse, RegisterFormValue, RegisterResponse } from "../interfaces/registro";
import { useStorage } from "./useStorage";

export const useAuth = () => {

    const { setUserData } = useContext(AuthContext);

    const {setValue} = useStorage();

    const [isLoading, ] = useState(false);

    const login = async (email: string, password: string) => {
            const respuesta: LoginResponse = await axiosLogin(email, password);

            if (respuesta.res) {
                const user: JugadorData = {
                    nombre: respuesta.data.personalData.nombre,
                    apellido: respuesta.data.personalData.apellido,
                    telefono: respuesta.data.personalData.telefono,
                    apodo: respuesta.data.personalData.apodo,
                    isAdmin: respuesta.data.isAdmin,
                    _id: respuesta.data.personalData._id
                }
                setUserData(user);
                await setValue("token", respuesta.data.token);
            }
            return respuesta.status;
    };

    const onRegister = async (data: RegisterFormValue) => {
        try {
            const response: RegisterResponse = await axiosRegister(data);
            /*if (response.token) {
                setValue("token", response.token);
            }*/
            return response
        } catch (e) {
            console.error(e);
            return {res: false, status: UNKNOWN}
        }
    }
    return {
        isLoading,
        login,
        onRegister
    }
};