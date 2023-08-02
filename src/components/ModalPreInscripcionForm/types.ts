import { PreInscripcion } from "../../interfaces/inscripcion";

export type ModalPreInscripcionFormType = {
    isOpen: boolean;
    setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
    jugador: PreInscripcion,
    setInscripcion: any
}