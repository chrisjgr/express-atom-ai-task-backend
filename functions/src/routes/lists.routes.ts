/* eslint-disable require-jsdoc */
/* eslint-disable new-cap */


import { Router } from "express";
import { ListControllerInstance } from "../controllers";
import { AuthMiddleware } from "../middlewares/auth.middleware";

export class ListRoutes {
    static get routes(): Router {
        const router = Router();

        const controller = ListControllerInstance;

        //* Routes
        router.post("/", [AuthMiddleware.validateJWT], controller.createList);
        router.put("/:id", [AuthMiddleware.validateJWT], controller.updateList);
        router.get("/:id", [AuthMiddleware.validateJWT], controller.getList);
        router.get("/user/:userId", [AuthMiddleware.validateJWT], controller.getListByUser);
        router.delete("/:id", [AuthMiddleware.validateJWT], controller.deleteList);

        return router;
    }
}
