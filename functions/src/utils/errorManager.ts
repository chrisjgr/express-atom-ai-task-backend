/* eslint-disable require-jsdoc */
import { CustomError } from "./custom.errors";
import { Response } from "express";

export class ErrorManager {
    static handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) {
            return res.status(400 as number).json({ error: error.message });
        }

        console.log(`${error}`);
        return res.status(500).json({ error: "Internal server error" });
    };
}
