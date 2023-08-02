export type JugadorData = {
    nombre: string,
    apellido: string,
    apodo?: string,
    isAdmin: boolean,
    _id: string,
    telefono: string
}

export type Jugador = {
    nombre: string,
    _id: string,
    categoria: number,
    equipo?: string
}