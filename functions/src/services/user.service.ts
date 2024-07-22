/* eslint-disable require-jsdoc */
import { JwtAdapter } from "../config";
import { LoginUserDto, RegisterUserDto } from "../dtos";
import { CustomError } from "../utils";
import { userRol } from "../enums";
import { AuthRepositoryInstance } from "../repositories";

class UserService {
    async login(loginDto: LoginUserDto) {
        const user = await AuthRepositoryInstance.getUserByEmail(loginDto.email);

        const token = await JwtAdapter.generateToken({ id: user.getId() }, loginDto.duration);
        if (!token) throw CustomError.internalServer("Error while creating JWT");

        return {
            token,
            user: user.toJson(),
        };
    }

    async getUserById(userId: string) {
        const user = await AuthRepositoryInstance.getUserById(userId);

        return user.toJson();
    }

    async register(registerParams: RegisterUserDto) {
        const user = await AuthRepositoryInstance.createUser(registerParams.email, registerParams.rol as userRol);

        const token = await JwtAdapter.generateToken({ id: user.getId() }, "7d");
        if (!token) throw CustomError.internalServer("Error while creating JWT");

        return {
            token,
            user: user.toJson(),
        };
    }
}

export const AuthServiceInstance = new UserService();
