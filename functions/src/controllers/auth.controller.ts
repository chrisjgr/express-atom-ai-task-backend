/* eslint-disable require-jsdoc */
import { Request, Response } from "express";
import { AuthServiceInstance } from "../services";
import { LoginUserDto, RegisterUserDto } from "../dtos";
import { ErrorManager } from "../utils";
import { HasUserDto } from "../dtos/auth/has-user.dto";

class UserController {
    loginUser(req: Request, res: Response) {
        const [error, loginUserDto] = LoginUserDto.create(req.body);
        if (error) return res.status(400).json({ error });

        AuthServiceInstance.login(loginUserDto as LoginUserDto)
            .then((user) => res.status(200).json(user))
            .catch((error) => ErrorManager.handleError(error, res));

        return;
    }

    registerUser(req: Request, res: Response) {
        const [error, registerUserDto] = RegisterUserDto.create(req.body);
        if (error) return res.status(400).json({ error });

        AuthServiceInstance.register(registerUserDto as RegisterUserDto)
            .then((user) => res.status(201).json(user))
            .catch((error) => ErrorManager.handleError(error, res));

        return;
    }

    hasUser(req: Request, res: Response) {
        res.status(200).json(req.body?.user);
    }
}

export const AuthControllerInstance = new UserController();
