import { ReactNode } from "react";

export type ProtectedType = {
    isLogged: boolean;
    children: ReactNode;
    path: string;
    exact: boolean;
}