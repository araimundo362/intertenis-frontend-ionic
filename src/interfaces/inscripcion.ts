export type InscripcionFormValues = {
    nombre: string,
    apellido: string,
    telefono: string,
};

export type PreInscripcion = {
    _id:       string;
    nombre:    string;
    apellido:  string;
    categoria: number;
    equipo:    string;
    zona:      number;
    telefono:  string;
    estado:    string;
}

export type JugadorInscripto = {
    apellido: string;
    categoria: number;
    nombre: string;
    telefono: string;
    equipo: string;
    estado: string;
    zona: string;
    _id: string;
}