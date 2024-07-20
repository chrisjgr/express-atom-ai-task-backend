/* eslint-disable require-jsdoc */

import { regularExps } from "../config/regular-exp";

export class LoginUserDto {
    private constructor(
        public email: string,
    ) { }

    static create(object: { [key: string]: any }): [string?, LoginUserDto?] {
        const { email } = object;

        if (!email) return ["Missing email"];
        if (!regularExps.email.test(email)) return ["Email is not valid"];

        return [undefined, new LoginUserDto(email)];
    }
}
