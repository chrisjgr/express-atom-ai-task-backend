import { userInterface } from "../interfaces";

/* eslint-disable require-jsdoc */
export class UserModel {
    private id = "";
    private email: string;

    constructor(id: string, email: string) {
        this.id = id;
        this.email = email;
    }

    getId() {
        return this.id;
    }

    getEmail() {
        return this.email;
    }

    setEmail(email: string) {
        this.email = email;
    }

    toJson(): userInterface {
        return {
            id: this.id != "" ? this.id : undefined,
            email: this.email,
        };
    }
}
