/* eslint-disable new-cap */
/* eslint-disable require-jsdoc */
import { Router } from "express";
import { AuthRoutes, ListRoutes, TaskRoutes } from "./routes";

export class AppRouter {
    static get routes(): Router {
        const router = Router();

        //* App Routes
        router.use("/api/auth", AuthRoutes.routes);
        router.use("/api/lists", ListRoutes.routes);
        router.use("/api/tasks", TaskRoutes.routes);

        return router;
    }
}
