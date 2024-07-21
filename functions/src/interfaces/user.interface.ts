import { userRol } from "../enums";

export interface userInterface {
    id?: string;
    email: string;
    rol: userRol;
}


export interface RolInterface {
    id: string;
    title: userRol;
}
