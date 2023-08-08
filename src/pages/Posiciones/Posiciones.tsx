import { IonCol, IonContent, IonItem, IonPage, IonRow, IonSelect, IonSelectOption } from "@ionic/react"
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useLiga } from "../../hooks/useLiga";
import { ZonasJugadores } from "../../interfaces/posiciones";

import Header from "../../components/Header";
import { useHistory } from "react-router";

import "./Posiciones.scss"

const PosicionesPage: React.FC = () => {
    
    const history = useHistory();

    const goBack = () => {
        history.goBack();
    };

    const { categoria } = useContext(AuthContext);

    const { getPosiciones } = useLiga();
    
   // const [categoriaTabla, setCategoriaTabla] = useState(categoria)
    const [table, setTable] = useState<ZonasJugadores[]>([]);

    const updateTabla = async (categoria: number) => {
        if (categoria) {
            const tablaPosiciones = await getPosiciones(categoria);
            setTable(tablaPosiciones);
        } else {
            setTable([]);
        }
    }

    useEffect(() => {
        updateTabla(categoria);
    }, [])// eslint-disable-line react-hooks/exhaustive-deps

    const onSelectTable = (cat: number) => {
        updateTabla(cat);
    };

    return <IonPage>
            <Header label="Posiciones" action={goBack} />
                <IonContent className="background-home">
                    <IonRow>
                        <IonCol size="12" >
                                <IonSelect className="select posiciones-select" placeholder="Categoria*" onIonChange={(ev) => onSelectTable(ev.detail.value)}>
                                    <IonSelectOption value={1}>1ra</IonSelectOption>
                                    <IonSelectOption value={2}>2da</IonSelectOption>
                                    <IonSelectOption value={3}>3ra</IonSelectOption>
                                    <IonSelectOption value={4}>4ta</IonSelectOption>
                                    <IonSelectOption value={5}>5ta</IonSelectOption>
                                    <IonSelectOption value={6}>6ta</IonSelectOption>
                                </IonSelect>
                        </IonCol>
                    </IonRow>
                    {table.length === 0 && <IonRow>
                            <IonCol size="12" className="flex-align-center">
                                <h3 className="text-empty-players">No se han inscripto jugadores a la categoria!</h3>
                            </IonCol>
                        </IonRow> }
                    {table.length === 1 && <>
                        <IonItem lines="inset" className="headers-tabla">
                        <IonRow className="width-100">
                            <IonCol size="1" className="flex-align-center"><h5 className="size-numbers">Pos</h5> </IonCol>
                            {/*<IonCol size="3" className="fixed-width"><h4 className="nombre-tabla">Nombre</h4></IonCol>*/}
                            <IonCol offset="3" size="1" className="flex-align-center"><h5 className="size-numbers">PG</h5></IonCol>
                            <IonCol size="1" className="flex-align-center"><h5 className="size-numbers">PP</h5></IonCol>
                            <IonCol size="1" className="flex-align-center"><h5 className="size-numbers">S+</h5></IonCol>
                            <IonCol size="1" className="flex-align-center"><h5 className="size-numbers">S-</h5></IonCol>
                            <IonCol size="1" className="flex-align-center"><h5 className="size-numbers">G+</h5></IonCol>
                            <IonCol size="1" className="flex-align-center"><h5 className="size-numbers">G-</h5></IonCol>
                            <IonCol size="1" className="flex-align-center"><h5 className="size-numbers">Pts</h5></IonCol>
                            <IonCol size="1" className="flex-align-center"><h5 className="size-numbers">/</h5></IonCol>
                        </IonRow>
                        </IonItem>
                        {table[0].jugadores.map((elem, index) => <>
                                        <IonItem lines="full" className="transparent-background" key={elem.nombre}>
                                            <IonRow className="width-100">
                                                <IonCol size="1" className="flex-align-center column-border"><h5 className={`${(index + 1) % 2 === 0 ? "posicion-par-letra" : "posicion-impar-letra"} size-numbers`}>{index + 1}</h5> </IonCol>
                                                <IonCol size="3" className="fixed-width column-border flex-align-center withBorderContinue "><h4 className={`${(index + 1) % 2 === 0 ? "posicion-par-letra" : "posicion-impar-letra"} size-numbers`}>{elem.nombre}</h4></IonCol>
                                                <IonCol size="1" className="flex-align-center column-border withBorderDashed"><h5 className={`${(index + 1) % 2 === 0 ? "posicion-par-letra" : "posicion-impar-letra"} size-numbers`}>{elem.partidosGanados}</h5></IonCol>
                                                <IonCol size="1" className="flex-align-center column-border withBorderContinue"><h5 className={`${(index + 1) % 2 === 0 ? "posicion-par-letra" : "posicion-impar-letra"} size-numbers`}>{elem.partidosPerdidos}</h5></IonCol>
                                                <IonCol size="1" className="flex-align-center column-border withBorderDashed"><h5 className={`${(index + 1) % 2 === 0 ? "posicion-par-letra" : "posicion-impar-letra"} size-numbers`}>{elem.setsAFavor}</h5></IonCol>
                                                <IonCol size="1" className="flex-align-center column-border withBorderContinue"><h5 className={`${(index + 1) % 2 === 0 ? "posicion-par-letra" : "posicion-impar-letra"} size-numbers`}>{elem.setsEnContra}</h5></IonCol>
                                                <IonCol size="1" className="flex-align-center column-border withBorderDashed"><h5 className={`${(index + 1) % 2 === 0 ? "posicion-par-letra" : "posicion-impar-letra"} size-numbers`}>{elem.gamesAFavor}</h5></IonCol>
                                                <IonCol size="1" className="flex-align-center column-border withBorderContinue"><h5 className={`${(index + 1) % 2 === 0 ? "posicion-par-letra" : "posicion-impar-letra"} size-numbers`}>{elem.gamesEnContra}</h5></IonCol>
                                                <IonCol size="1" className="flex-align-center column-border withBorderContinue"><h5 className={`${(index + 1) % 2 === 0 ? "posicion-par-letra" : "posicion-impar-letra"} size-numbers`}>{elem.puntos}</h5></IonCol>
                                                <IonCol size="1" className="flex-align-center"><h5 className={`${(index + 1) % 2 === 0 ? "posicion-par-letra" : "posicion-impar-letra"} size-numbers lastPaddingLeft fontPromedio`}>{elem.promedio.toFixed(2)}</h5></IonCol>
                                            </IonRow>
                                        </IonItem>
                                        <div className="separador"></div>
                                    </>)}
                    </>}
                    {table.length > 1 && table.map((zona, index) => <>
                        <IonRow>
                            <IonCol size="10" offset="1">
                                <h2 className="cargar-resultado__label">Zona {zona._id}</h2>
                            </IonCol>
                        </IonRow>
                        <IonItem lines="inset" className="headers-tabla">
                        <IonRow className="width-100">
                            <IonCol size="1" className="flex-align-center"><h5 className="size-numbers">Pos</h5> </IonCol>
                            {/*<IonCol size="3" className="fixed-width"><h4 className="nombre-tabla">Nombre</h4></IonCol>*/}
                            <IonCol offset="3" size="1" className="flex-align-center"><h5 className="size-numbers">PG</h5></IonCol>
                            <IonCol size="1" className="flex-align-center"><h5 className="size-numbers">PP</h5></IonCol>
                            <IonCol size="1" className="flex-align-center"><h5 className="size-numbers">S+</h5></IonCol>
                            <IonCol size="1" className="flex-align-center"><h5 className="size-numbers">S-</h5></IonCol>
                            <IonCol size="1" className="flex-align-center"><h5 className="size-numbers">G+</h5></IonCol>
                            <IonCol size="1" className="flex-align-center"><h5 className="size-numbers">G-</h5></IonCol>
                            <IonCol size="1" className="flex-align-center"><h5 className="size-numbers">Pts</h5></IonCol>
                            <IonCol size="1" className="flex-align-center"><h5 className="size-numbers">/</h5></IonCol>
                        </IonRow>
                    </IonItem>
                    {zona.jugadores.map((elem, index) => <IonItem lines="full" className="transparent-background" key={elem.nombre}>
                                        <IonRow className="width-100">
                                                <IonCol size="1" className="flex-align-center column-border"><h5 className={`${(index + 1) % 2 === 0 ? "posicion-par-letra" : "posicion-impar-letra"} size-numbers`}>{index + 1}</h5> </IonCol>
                                                <IonCol size="3" className="fixed-width column-border flex-align-center withBorderContinue "><h4 className={`${(index + 1) % 2 === 0 ? "posicion-par-letra" : "posicion-impar-letra"} size-numbers`}>{elem.nombre}</h4></IonCol>
                                                <IonCol size="1" className="flex-align-center column-border withBorderDashed"><h5 className={`${(index + 1) % 2 === 0 ? "posicion-par-letra" : "posicion-impar-letra"} size-numbers`}>{elem.partidosGanados}</h5></IonCol>
                                                <IonCol size="1" className="flex-align-center column-border withBorderContinue"><h5 className={`${(index + 1) % 2 === 0 ? "posicion-par-letra" : "posicion-impar-letra"} size-numbers`}>{elem.partidosPerdidos}</h5></IonCol>
                                                <IonCol size="1" className="flex-align-center column-border withBorderDashed"><h5 className={`${(index + 1) % 2 === 0 ? "posicion-par-letra" : "posicion-impar-letra"} size-numbers`}>{elem.setsAFavor}</h5></IonCol>
                                                <IonCol size="1" className="flex-align-center column-border withBorderContinue"><h5 className={`${(index + 1) % 2 === 0 ? "posicion-par-letra" : "posicion-impar-letra"} size-numbers`}>{elem.setsEnContra}</h5></IonCol>
                                                <IonCol size="1" className="flex-align-center column-border withBorderDashed"><h5 className={`${(index + 1) % 2 === 0 ? "posicion-par-letra" : "posicion-impar-letra"} size-numbers`}>{elem.gamesAFavor}</h5></IonCol>
                                                <IonCol size="1" className="flex-align-center column-border withBorderContinue"><h5 className={`${(index + 1) % 2 === 0 ? "posicion-par-letra" : "posicion-impar-letra"} size-numbers`}>{elem.gamesEnContra}</h5></IonCol>
                                                <IonCol size="1" className="flex-align-center column-border withBorderContinue"><h5 className={`${(index + 1) % 2 === 0 ? "posicion-par-letra" : "posicion-impar-letra"} size-numbers`}>{elem.puntos}</h5></IonCol>
                                                <IonCol size="1" className="flex-align-center"><h5 className={`${(index + 1) % 2 === 0 ? "posicion-par-letra" : "posicion-impar-letra"} size-numbers lastPaddingLeft fontPromedio`}>{elem.promedio.toFixed(2)}</h5></IonCol>
                                            </IonRow>
                                        </IonItem>)}
                    </>)}
                </IonContent>
    </IonPage>
}

export default PosicionesPage;