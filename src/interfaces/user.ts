export type JugadorData = {
    nombre: string,
    apellido: string,
    apodo?: string,
    email: string,
    isAdmin: boolean,
    _id: string
}

export type Jugador = {
    nombre: string,
    _id: string,
    categoria: number,
    equipo?: string
}