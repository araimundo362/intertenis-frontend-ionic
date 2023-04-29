export type ZonasJugadores = {
    _id: string,
    jugadores: Posicion[];
}

export type Posicion = {
    posicion: number,
    nombre: string,
    puntos:  number,
    partidosGanados: number,
    partidosPerdidos: number,
    promedio: number,
    gamesAFavor: number,
    gamesEnContra: number,
    setsAFavor: number,
    setsEnContra: number,
    _id: string
}