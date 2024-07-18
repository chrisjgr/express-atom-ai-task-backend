import { CustomError } from "./custom.errors";
import { Response } from "express";
export const handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
        return res.status(200 as number).json({ error: error.message });
    }

    console.log(`${error}`);
    return res.status(500).json({ error: "Internal server error" });
};
