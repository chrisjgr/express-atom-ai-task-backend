/* eslint-disable require-jsdoc */
import { NextFunction, Request, Response } from "express";
import { JwtAdapter } from "../config";
import { JwtPayloadInterface } from "../interfaces";
import { UserService } from "../services";

export class AuthMiddleware {
    constructor(
        private useService: UserService,
    ) { }

    async validateJWT(req: Request, res: Response, next: NextFunction) {
        const authorization = req.header("Authorization");

        if (!authorization) return res.status(401).json({ error: "No token provided" });
        if (!authorization.startsWith("Bearer ")) return res.status(401).json({ error: "Invalid Bearer token" });

        const token = authorization.split(" ").at(1) || "";

        try {
            const payload = await JwtAdapter.validateToken<JwtPayloadInterface>(token) as JwtPayloadInterface;
            if (!payload) return res.status(401).json({ error: "Invalid token" });

            const user = this.useService.getUserById(payload.id);
            if (!user) return res.status(401).json({ error: "Invalid token - user" });

            req.body.user = user;

            return next();
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
}
