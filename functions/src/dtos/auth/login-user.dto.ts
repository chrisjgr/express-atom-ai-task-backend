/* eslint-disable require-jsdoc */

import { regularExps } from "../../config/regular-exp";

export class LoginUserDto {
    private constructor(
        public email: string,
        public duration?: string,
    ) { }

    static create(object: { [key: string]: any }): [string?, LoginUserDto?] {
        const { email, duration = "2h" } = object;

        if (!email) return ["Missing email"];
        if (typeof email !== "string") return ["email is not valid, must be a string"];
        if (!regularExps.email.test(email)) return ["Email is not valid"];

        return [undefined, new LoginUserDto(email, duration)];
    }
}
