/* eslint-disable new-cap */
/* eslint-disable require-jsdoc */
import { Router } from "express";
import { AuthControllerInstance } from "../controllers";
import { AuthMiddleware } from "../middlewares/auth.middleware";

export class AuthRoutes {
    static get routes(): Router {
        const router = Router();

        const controller = AuthControllerInstance;


        //* Routes
        router.post("/login", controller.loginUser);
        router.post("/register", controller.registerUser);
        router.get("/has-user", [AuthMiddleware.validateJWT], controller.hasUser);

        return router;
    }
}
