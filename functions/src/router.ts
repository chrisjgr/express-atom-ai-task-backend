/* eslint-disable new-cap */
/* eslint-disable require-jsdoc */
import { Router } from "express";
import { AuthRoutes } from "./routes/auth.routes";

export class AppRouter {
    static get routes(): Router {
        const router = Router();

        //* App Routes
        router.use("/api/auth", AuthRoutes.routes);

        return router;
    }
}
