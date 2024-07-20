/* eslint-disable require-jsdoc */
import { JwtAdapter } from "../config";
import { CustomError } from "../utils";
import { UserRepository } from "./../repositories/user.repository";

export class UserService {
    constructor(
        private UserRepository: UserRepository,
    ) { }

    async login(email: string) {
        const user = await this.UserRepository.getUserByEmail(email);

        const token = JwtAdapter.generateToken({ id: user.getId() });

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
}
