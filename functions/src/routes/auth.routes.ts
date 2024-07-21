/* eslint-disable new-cap */
/* eslint-disable require-jsdoc */
import { Router } from "express";
import { UserRepository } from "../repositories";
import { AuthController } from "../controllers";
import { UserService } from "../services";

export class AuthRoutes {
    static get routes(): Router {
        const router = Router();

        const authRepository = new UserRepository();

        const authService = new UserService(authRepository);

        const controller = new AuthController(authService);


        //* Routes
        router.post("/login", controller.loginUser);
        router.post("/register", controller.registerUser);

        return router;
    }
}
