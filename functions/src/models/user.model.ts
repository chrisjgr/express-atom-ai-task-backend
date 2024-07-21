import { userInterface } from "../interfaces";
import { userRol } from "../enums";

/* eslint-disable require-jsdoc */
export class UserModel {
    private id: string;
    private email: string;
    private rol: userRol;


    constructor(email: string, rol = userRol.user, id = "", ) {
        this.id = id;
        this.email = email;
        this.rol = rol;
    }

    getId() {
        return this.id;
    }

    getEmail() {
        return this.email;
    }

    getRol() {
        return this.rol;
    }

    setEmail(email: string) {
        this.email = email;
    }

    setRol(rol: userRol) {
        this.rol = rol;
    }

    toJson(): userInterface {
        return {
            id: this.id != "" ? this.id : undefined,
            email: this.email,
            rol: this.rol,
        };
    }
}
