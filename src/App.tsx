import { IonApp, setupIonicReact } from '@ionic/react';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import { AppRouter } from './routers/AppRouter';
import { AuthContextProvider } from './context/AuthContext';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <AuthContextProvider>
      <AppRouter/>
    </AuthContextProvider>
  </IonApp>
);

export default App;

/* 
-- Headers de las tablas de posiciones color AMARILLO CON LETRAS NEGRAS
-- Invertir colores de las posiciones: Fondo negro, letras amarillas
-- Tablas de posiciones 


-- Autocompletar input a medida que se va completando -> Ingresa un 6, agregar una /

--Home: -> fondo gris
           Botones gris oscuro fondeado
           Letra     color: white;
                      font-weight: 750;


-- Analizar Resultados

-- AGREGAR TELEFONO AL REGISTRO.
-- Agregar autorizacion para inscribirse. 

Estado al inscribirse: PREINSCRIPTO, 
Admin tiene que confirmar la inscripcion. 

Inscripcion: NOMBRE, APELLIDO, TELEFONO.
La persona queda preinscripta.

Admin al confirmar inscripcion desgina Categoria,Zona, equipo



*/