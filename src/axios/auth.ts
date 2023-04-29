import axiosInstance from '.';
import { OK, UNKNOWN, USER_EXISTS, USER_NOT_FOUND } from '../constants/constants';
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
            case 403:
                return {res: false, status: USER_EXISTS};
            case 404: 
                return {res: false, status: USER_NOT_FOUND}
            default:
                return {res: false, status: UNKNOWN}
        }
    }
}

export const axiosRegister = async ( body: RegisterFormValue) => {
    try {
        await axiosInstance.post(REGISTER, body);
        return {res: true, status: OK};
    } catch (e: any) {
        console.error(e);
        switch (e.response.status) {
            case 403:
                return {res: false, status: USER_EXISTS};
        }
    }
}