import axiosInstance from '.';
import { OK, UNKNOWN, USER_EXISTS, USER_NOT_FOUND, WRONG_PASSWORD } from '../constants/constants';
import { RegisterFormValue } from '../interfaces/registro';
import { LOGIN, REGISTER } from './constants';

export const axiosLogin = async (user: string, password: string) => {
    const body = {user, password}
    try {
        const response = await axiosInstance.post(LOGIN, body);
        return {res: true, status: OK, data: response.data};
    } catch (e: any) {
        console.error(e);
        switch (e.response.status) {
            case 400: 
                return {res: false, status: USER_NOT_FOUND, data: null}
            case 401: 
                return {res: false, status: WRONG_PASSWORD, data: null}
            default:
                return {res: false, status: UNKNOWN, data: null}
        }
    }
}

export const axiosRegister = async ( body: RegisterFormValue) => {
    try {
        const {data: { token }} = await axiosInstance.post(REGISTER, body);
        return {res: true, status: OK, token };
    } catch (e: any) {
        console.error(e);
        switch (e.response.data) {
            case "USER_EXISTS":
                return {res: false, status: USER_EXISTS};
            default: 
                return {res: false, status: UNKNOWN};
        }
    }
}