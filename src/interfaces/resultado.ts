export type ResultadoRequest = {
    own: OwnData,
    fecha: string,
    categoria: number,
    rival: InfoJugador
}

export type OwnData = {
    nombre: string,
    _id: string,
    statusScore: "GANE" | "PERDI" | undefined,
    miEquipo: string
}

export type InfoJugador = {
    nombre: string,
    _id: string,
    equipo?: string
}

export type ConfirmacionResultado = {
    resultado: string,
    fecha: string,
    ganador: {
        _id: string,
        equipoGanador?: string,
        nombre: string
    },
    perdedor: {
        _id: string,
        equipoPerdedor?: string
        nombre: string
    },
    //admin que definio
}