/* eslint-disable require-jsdoc */
import { JwtAdapter } from "../config";
import { LoginUserDto, RegisterUserDto } from "../dtos";
import { CustomError } from "../utils";
import { userRol } from "../enums";
import { UserRepository } from "./../repositories";

export class UserService {
    constructor(
        private UserRepository: UserRepository,
    ) { }

    async login(loginDto: LoginUserDto) {
        const user = await this.UserRepository.getUserByEmail(loginDto.email);

        const token = JwtAdapter.generateToken({ id: user.getId() }, loginDto.duration);

        if (!token) throw CustomError.internalServer("Error while creating JWT");

        return {
            token,
            user: user.toJson(),
        };
    }

    async getUserById(userId: string) {
        const user = await this.UserRepository.getUserById(userId);

        return user.toJson();
    }

    async register(registerParams: RegisterUserDto) {
        const user = await this.UserRepository.createUser(registerParams.email, registerParams.rol as userRol);

        const token = JwtAdapter.generateToken({ id: user.getId() });

        if (!token) throw CustomError.internalServer("Error while creating JWT");

        return {
            token,
            user: user.toJson(),
        };
    }
}
