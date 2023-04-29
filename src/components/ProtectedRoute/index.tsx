import { Redirect, Route } from "react-router"
import { ProtectedType } from "./types";

const ProtectedRoute: React.FC<ProtectedType> = ({isLogged, path, exact, children}) => {
    
    return isLogged ? <Route path={path} exact={exact} > {children} </Route> : <Redirect to="/" />
}

export default ProtectedRoute;
