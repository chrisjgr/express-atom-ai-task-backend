/* eslint-disable new-cap */
/* eslint-disable require-jsdoc */
import { Router } from "express";

import { TaskControllerInstance } from "../controllers/task.controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";

export class TaskRoutes {
    static get routes(): Router {
        const router = Router();

        const controller = TaskControllerInstance;


        //* Routes
        router.get("/:id", [AuthMiddleware.validateJWT], controller.getTaskById);
        router.get("/list/:listId", [AuthMiddleware.validateJWT], controller.getTasksByList);
        router.post("/", [AuthMiddleware.validateJWT], controller.createTask);
        router.put("/:id", [AuthMiddleware.validateJWT], controller.updateTask);
        router.delete("/:id", [AuthMiddleware.validateJWT], controller.deleteTask);
        router.get("/user/:userId", [AuthMiddleware.validateJWT], controller.getAllUserTask);

        return router;
    }
}

