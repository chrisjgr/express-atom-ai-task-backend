/* eslint-disable require-jsdoc */
/* eslint-disable new-cap */


import { Router } from "express";
import { ListRepository } from "../repositories";
import { ListService } from "../services";
import { ListController } from "../controllers";
import { AuthMiddleware } from "../middlewares/auth.middleware";

export class ListRoutes {
    static get routes(): Router {
        const router = Router();

        const listRepository = new ListRepository();
        const listService = new ListService(listRepository);
        const controller = new ListController(listService);

        //* Routes
        router.get("/", [AuthMiddleware.validateJWT], controller.getList);


        return router;
    }
}
