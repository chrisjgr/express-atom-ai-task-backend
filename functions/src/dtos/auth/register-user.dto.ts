/* eslint-disable require-jsdoc */

import { regularExps } from "../../config/regular-exp";
import { userRol } from "../../enums";

export class RegisterUserDto {
    private constructor(
        public email: string,
        public rol: string,
    ) { }

    static create(object: { [key: string]: any }): [string?, RegisterUserDto?] {
        const { email, rol } = object;

        if (!email) return ["Missing email"];
        if (!rol) return ["Missing Rol"];

        if (typeof email !== "string") return ["email is not valid, must be a string"];
        if (typeof rol !== "string") return ["rol is not valid, must be a string"];

        if (!regularExps.email.test(email)) return ["Email is not valid"];

        if (rol != userRol.admin && rol != userRol.user) return ["Rol is not valid"];

        return [undefined, new RegisterUserDto(email, rol)];
    }
}
