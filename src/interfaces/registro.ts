export type RegisterFormValue = {
    nombre: string,
    apellido: string,
    apodo?: string,
    email: string,
    password: string,
    telefono: string
};

export type RegisterResponse = {
    res: boolean,
    status: string,
    token?: string
}

type PersonalData = {
    nombre: string,
    apellido: string,
    telefono: string,
    apodo: string,
    _id: string
}

type DataUser = {
    token: string,
    isAdmin: boolean,
    personalData: PersonalData
}

export type LoginResponse = {
    res: boolean;
    status: string;
    data: DataUser;
}