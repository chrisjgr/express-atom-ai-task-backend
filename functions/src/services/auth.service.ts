/* eslint-disable require-jsdoc */
import { UserRepository } from "./../repositories/user.repository";

export class UserService {
    constructor(
        private UserRepository: UserRepository,
    ) { }

    async login(email: string) {
        const user = await this.UserRepository.getUserByEmail(email);
        // TODO: Agregar el token
        return {
            token: "",
            user: user.toJson(),
        };
    }
}
