/* eslint-disable require-jsdoc */
import { Request, Response } from "express";
import { UserService } from "../services";
import { LoginUserDto } from "../dtos/login-user.dto";
import { ErrorManager } from "../utils";

export class AuthController {
    constructor(
        private userService: UserService,
    ) {
    }

    loginUser(req: Request, res: Response) {
        const [error, loginUserDto] = LoginUserDto.create(req.body);
        if (error) return res.status(400).json({ error });

        this.userService.login(loginUserDto as LoginUserDto)
            .then((user) => res.json(user))
            .catch((error) => ErrorManager.handleError(error, res));

        return;
    }
}
