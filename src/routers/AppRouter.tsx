import { IonRouterOutlet } from "@ionic/react"
import { IonReactRouter } from "@ionic/react-router"
import { useContext } from "react";
import { Redirect, Route } from "react-router"
import ProtectedRoute from "../components/ProtectedRoute";
import { AuthContext } from "../context/AuthContext";
import HomePage from "../pages/Home/Home";

import LoginPage from "../pages/Login/Login";
import RecuperarContrasenaPage from "../pages/RecuperarContrasena/Recuperar";
import RegisterPage from "../pages/Register/Register";
import InscripcionPage from "../pages/Inscripcion/Inscripcion";
import ResultadoPage from "../pages/Resultados/Resultados";
import PosicionesPage from "../pages/Posiciones/Posiciones";
import PreInscripcionPage from "../pages/PreInscripcion/PreInscripcion";
import JugadoresPage from "../pages/Jugadores/Jugadores";
import DetalleJugador from "../pages/DetalleJugador/DetalleJugador";
import { GlobalContextProvider } from "../context/GlobalContext";
import ListaResultadosPage from "../pages/ListaResultados/ListaResultados";

export const AppRouter = () => {
  
    const { isLoggedIn } = useContext(AuthContext);

    return (
      <>
        <IonReactRouter>
          <IonRouterOutlet>
            <Route path="/" exact={true}>
              <Redirect to="/login" />
            </Route>
            <Route path="/login" exact={true}>
              <LoginPage />
            </Route>
            <Route path="/register" exact={true}>
              <RegisterPage />
            </Route>
            <Route path="/recuperar-password" exact={true}>
              <RecuperarContrasenaPage />
            </Route>
            <GlobalContextProvider>
            <ProtectedRoute path="/home" exact={true} isLogged={isLoggedIn}>
              <HomePage />
            </ProtectedRoute>
            <ProtectedRoute path="/inscripcion" exact={true} isLogged={isLoggedIn}>
              <InscripcionPage />
            </ProtectedRoute>
            <ProtectedRoute path="/cargar-resultado" exact={true} isLogged={isLoggedIn}>
              <ResultadoPage />
            </ProtectedRoute>
            <ProtectedRoute path="/posiciones" exact={true} isLogged={isLoggedIn}>
              <PosicionesPage />
            </ProtectedRoute>
            <ProtectedRoute path="/pre-inscripciones" exact={true} isLogged={isLoggedIn}>
              <PreInscripcionPage />
            </ProtectedRoute>
            <ProtectedRoute path="/jugadores" exact={true} isLogged={isLoggedIn}>
              <JugadoresPage />
            </ProtectedRoute>
            <ProtectedRoute path="/administrar-jugador" exact={true} isLogged={isLoggedIn}>
              <DetalleJugador />
            </ProtectedRoute>
            <ProtectedRoute path="/resultados" exact={true} isLogged={isLoggedIn}>
              <ListaResultadosPage />
            </ProtectedRoute>
            </GlobalContextProvider>
          </IonRouterOutlet>
        </IonReactRouter>
      </>
    )
}