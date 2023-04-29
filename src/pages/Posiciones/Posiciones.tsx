import { IonButton, IonCol, IonContent, IonHeader, IonIcon, IonItem, IonPage, IonRow, IonSelect, IonSelectOption, IonSpinner } from "@ionic/react"
import { arrowBack } from "ionicons/icons";
import { register } from "../../serviceWorkerRegistration";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useLiga } from "../../hooks/useLiga";
import { Posicion, ZonasJugadores } from "../../interfaces/posiciones";

import "./Posiciones.scss"
import TennisBallComponent from "../../components/TennisBall";
import Header from "../../components/Header";
import { useHistory } from "react-router";

const PosicionesPage: React.FC = () => {
    
    const history = useHistory();

    const goBack = () => {
        history.goBack();
    };

    const { categoria } = useContext(AuthContext);

    const { getPosiciones, isLoading} = useLiga();
    
    const [categoriaTabla, setCategoriaTabla] = useState(categoria)
    const [table, setTable] = useState<ZonasJugadores[]>([]);

    const updateTabla = async () => {
        const tablaPosiciones = await getPosiciones(categoriaTabla);
        setTable(tablaPosiciones);
    }
    useEffect(() => {
        updateTabla();
    }, [categoriaTabla])
    
    useEffect(()=> {
        console.log("table??", table)
    }, [table]);

    const onSelectTable = (cat: number) => {
        setCategoriaTabla(cat);
    };

    return <IonPage>
            <Header label="Posiciones" action={goBack} />
                <IonContent>
                    <IonRow>
                        <IonCol size="10" offset="1">
                            <IonItem fill="solid">
                                <IonSelect className="select" placeholder="Categoria*" interface="popover" onIonChange={(ev) => onSelectTable(ev.detail.value)}>
                                    <IonSelectOption value={1}>1ra</IonSelectOption>
                                    <IonSelectOption value={2}>2da</IonSelectOption>
                                    <IonSelectOption value={3}>3ra</IonSelectOption>
                                    <IonSelectOption value={4}>4ta</IonSelectOption>
                                    <IonSelectOption value={5}>5ta</IonSelectOption>
                                    <IonSelectOption value={6}>6ta</IonSelectOption>
                                </IonSelect>
                            </IonItem>
                        </IonCol>
                    </IonRow>
                    {table.length === 0 && <h3>No se han inscripto jugadores a la categoria!</h3> }
                    {table.length === 1 && <>
                        <IonItem lines="inset">
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
                        {table[0].jugadores.map((elem, index) => <IonItem lines="full" className={(index + 1) % 2 === 0 ? "posicion-par" : "posicion-impar"}>
                                            <IonRow className="width-100">
                                                <IonCol size="1" className="flex-align-center column-border"><h5 className="size-numbers">{index + 1}</h5> </IonCol>
                                                <IonCol size="3" className="fixed-width column-border flex-align-center"><h4 className="nombre-tabla">{elem.nombre}</h4></IonCol>
                                                <IonCol size="1" className="flex-align-center column-border"><h5 className="size-numbers">{elem.partidosGanados}</h5></IonCol>
                                                <IonCol size="1" className="flex-align-center column-border"><h5 className="size-numbers">{elem.partidosPerdidos}</h5></IonCol>
                                                <IonCol size="1" className="flex-align-center column-border"><h5 className="size-numbers">{elem.setsAFavor}</h5></IonCol>
                                                <IonCol size="1" className="flex-align-center column-border"><h5 className="size-numbers">{elem.setsEnContra}</h5></IonCol>
                                                <IonCol size="1" className="flex-align-center column-border"><h5 className="size-numbers">{elem.gamesAFavor}</h5></IonCol>
                                                <IonCol size="1" className="flex-align-center column-border"><h5 className="size-numbers">{elem.gamesEnContra}</h5></IonCol>
                                                <IonCol size="1" className="flex-align-center column-border"><h5 className="size-numbers">{elem.puntos}</h5></IonCol>
                                                <IonCol size="1" className="flex-align-center"><h5 className="size-numbers">{elem.promedio.toFixed(2)}</h5></IonCol>
                                            </IonRow>
                                        </IonItem>)}
                    </>}
                    {table.length > 1 && table.map((zona, index) => <>
                        <IonRow>
                            <IonCol size="10" offset="1">
                                <h3 className="cargar-resultado__label">Zona {zona._id}</h3>
                            </IonCol>
                        </IonRow>
                        <IonItem lines="inset">
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
                    {zona.jugadores.map((elem, index) => <IonItem lines="full" className={(index + 1) % 2 === 0 ? "posicion-par" : "posicion-impar"}>
                                            <IonRow className="width-100">
                                                <IonCol size="1" className="flex-align-center column-border"><h5 className="size-numbers">{index + 1}</h5> </IonCol>
                                                <IonCol size="3" className="fixed-width column-border flex-align-center"><h4 className="nombre-tabla">{elem.nombre}</h4></IonCol>
                                                <IonCol size="1" className="flex-align-center column-border"><h5 className="size-numbers">{elem.partidosGanados}</h5></IonCol>
                                                <IonCol size="1" className="flex-align-center column-border"><h5 className="size-numbers">{elem.partidosPerdidos}</h5></IonCol>
                                                <IonCol size="1" className="flex-align-center column-border"><h5 className="size-numbers">{elem.setsAFavor}</h5></IonCol>
                                                <IonCol size="1" className="flex-align-center column-border"><h5 className="size-numbers">{elem.setsEnContra}</h5></IonCol>
                                                <IonCol size="1" className="flex-align-center column-border"><h5 className="size-numbers">{elem.gamesAFavor}</h5></IonCol>
                                                <IonCol size="1" className="flex-align-center column-border"><h5 className="size-numbers">{elem.gamesEnContra}</h5></IonCol>
                                                <IonCol size="1" className="flex-align-center column-border"><h5 className="size-numbers">{elem.puntos}</h5></IonCol>
                                                <IonCol size="1" className="flex-align-center"><h5 className="size-numbers">{elem.promedio.toFixed(2)}</h5></IonCol>
                                            </IonRow>
                                        </IonItem>)}
                    </>)}
                </IonContent>
    </IonPage>
}

export default PosicionesPage;

/* 


 {table.length === 0 && <h3>No se han inscripto jugadores a la categoria!</h3> }
                    {table.length === 1 && <>
                        <IonItem lines="inset">
                        <IonRow className="width-100">
                            <IonCol size="1" className="flex-align-center"><h5 className="size-numbers">Pos</h5> </IonCol>
                            
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
                        {table[0].jugadores.map((elem, index) => <IonItem lines="full" className={(index + 1) % 2 === 0 ? "posicion-par" : "posicion-impar"}>
                                            <IonRow className="width-100">
                                                <IonCol size="1" className="flex-align-center column-border"><h5 className="size-numbers">{elem.posicion}</h5> </IonCol>
                                                <IonCol size="3" className="fixed-width column-border flex-align-center"><h4 className="nombre-tabla">{elem.nombre}</h4></IonCol>
                                                <IonCol size="1" className="flex-align-center column-border"><h5 className="size-numbers">{elem.partidosGanados}</h5></IonCol>
                                                <IonCol size="1" className="flex-align-center column-border"><h5 className="size-numbers">{elem.partidosPerdidos}</h5></IonCol>
                                                <IonCol size="1" className="flex-align-center column-border"><h5 className="size-numbers">{elem.setsAFavor}</h5></IonCol>
                                                <IonCol size="1" className="flex-align-center column-border"><h5 className="size-numbers">{elem.setsEnContra}</h5></IonCol>
                                                <IonCol size="1" className="flex-align-center column-border"><h5 className="size-numbers">{elem.gamesAFavor}</h5></IonCol>
                                                <IonCol size="1" className="flex-align-center column-border"><h5 className="size-numbers">{elem.gamesEnContra}</h5></IonCol>
                                                <IonCol size="1" className="flex-align-center column-border"><h5 className="size-numbers">{elem.puntos}</h5></IonCol>
                                                <IonCol size="1" className="flex-align-center"><h5 className="size-numbers">{elem.promedio.toFixed(2)}</h5></IonCol>
                                            </IonRow>
                                        </IonItem>)}
                    </>}
                    {table.length > 1 && table.map((zona, index) => <>
                        <IonRow>
                            <IonCol size="10" offset="1">
                                <h3 className="cargar-resultado__label">Zona {zona._id}</h3>
                            </IonCol>
                        </IonRow>
                        <IonItem lines="inset">
                        <IonRow className="width-100">
                            <IonCol size="1" className="flex-align-center"><h5 className="size-numbers">Pos</h5> </IonCol>
                           
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
                    {zona.jugadores.map((elem, index) => <IonItem lines="full" className={(index + 1) % 2 === 0 ? "posicion-par" : "posicion-impar"}>
                                            <IonRow className="width-100">
                                                <IonCol size="1" className="flex-align-center column-border"><h5 className="size-numbers">{elem.posicion}</h5> </IonCol>
                                                <IonCol size="3" className="fixed-width column-border flex-align-center"><h4 className="nombre-tabla">{elem.nombre}</h4></IonCol>
                                                <IonCol size="1" className="flex-align-center column-border"><h5 className="size-numbers">{elem.partidosGanados}</h5></IonCol>
                                                <IonCol size="1" className="flex-align-center column-border"><h5 className="size-numbers">{elem.partidosPerdidos}</h5></IonCol>
                                                <IonCol size="1" className="flex-align-center column-border"><h5 className="size-numbers">{elem.setsAFavor}</h5></IonCol>
                                                <IonCol size="1" className="flex-align-center column-border"><h5 className="size-numbers">{elem.setsEnContra}</h5></IonCol>
                                                <IonCol size="1" className="flex-align-center column-border"><h5 className="size-numbers">{elem.gamesAFavor}</h5></IonCol>
                                                <IonCol size="1" className="flex-align-center column-border"><h5 className="size-numbers">{elem.gamesEnContra}</h5></IonCol>
                                                <IonCol size="1" className="flex-align-center column-border"><h5 className="size-numbers">{elem.puntos}</h5></IonCol>
                                                <IonCol size="1" className="flex-align-center"><h5 className="size-numbers">{elem.promedio.toFixed(2)}</h5></IonCol>
                                            </IonRow>
                                        </IonItem>)}
                    </>)} */