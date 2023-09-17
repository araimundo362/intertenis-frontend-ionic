import { ResultadosResponse } from "../interfaces/resultado";

export const transformarResultado = (resultados: ResultadosResponse[]) => {
    return resultados.map((result) => {
        const resultadoSpliteado = result.score.split(" ");
        return {
            fecha: result.fecha,
            bloqueGanador: {
                ganador: result.ganador,
                set1: resultadoSpliteado[0].split("/")[0],
                set2: resultadoSpliteado[1].split("/")[0],
                set3: resultadoSpliteado[2] ?  resultadoSpliteado[2].split("/")[0] : null
            },
            bloquePerdedor: {
                perdedor: result.perdedor,
                set1: resultadoSpliteado[0].split("/")[1],
                set2: resultadoSpliteado[1].split("/")[1],
                set3: resultadoSpliteado[2] ?  resultadoSpliteado[2].split("/")[1] : null
            }
        }
    })
}