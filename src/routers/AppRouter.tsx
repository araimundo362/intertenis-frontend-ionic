import { IonContent, IonHeader, IonItem, IonLabel, IonMenu, IonRouterOutlet, IonTitle, IonToolbar } from "@ionic/react"
import { IonReactRouter } from "@ionic/react-router"
import { caretForwardOutline } from "ionicons/icons";
import { useContext, useEffect } from "react";
import { Redirect, Route, Switch } from "react-router"
import ProtectedRoute from "../components/ProtectedRoute";
import { AuthContext } from "../context/AuthContext";
import HomePage from "../pages/Home/Home";

import LoginPage from "../pages/Login/Login";
import RecuperarContrasenaPage from "../pages/RecuperarContrasena/Recuperar";
import RegisterPage from "../pages/Register/Register";
import InscripcionPage from "../pages/Inscripcion/Inscripcion";
import ResultadoPage from "../pages/Resultados/Resultados";
import PosicionesPage from "../pages/Posiciones/Posiciones";

export const AppRouter = () => {
  
    const { isLoggedIn } = useContext(AuthContext);
    console.log("isLoggedIn app router", isLoggedIn)
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
          </IonRouterOutlet>
        </IonReactRouter>
      </>
    )
}