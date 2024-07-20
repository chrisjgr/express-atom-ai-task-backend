/* eslint-disable require-jsdoc */

import { sign, verify } from "jsonwebtoken";
import { envs } from "./envs";
import { JwtPayloadInterface } from "../interfaces";


const JWT_SEED = envs.JWT_SEED;

export class JwtAdapter {
    static async generateToken(payload: JwtPayloadInterface, duration = "2h") {
        return new Promise((resolve) => {
            sign(payload, JWT_SEED, { expiresIn: duration }, (err, token) => {
                if (err) return resolve(null);

                resolve(token);
            });
        });
    }

    static validateToken<T>(token: string) {
        return new Promise((resolve) => {
            verify(token, JWT_SEED, {}, (err, decoded) => {
                if (err) return resolve(null);
                resolve(decoded as T);
            });
        });
    }
}
