/* eslint-disable require-jsdoc */

import { userInterface } from "./../interfaces/user.interface";

import { db } from "../config";
import { CustomError } from "../utils";
import { UserModel } from "../models";

export class UserRepository {
    public async getUserByEmail(email: string) {
        try {
            const userCollection = db.collection("users");

            const querySnapshot = userCollection
                .where("email", "==", email);

            const userData = await querySnapshot.get();

            if (userData.empty) throw CustomError.badRequest("Email not exist");

            const { email: userEmail, id } = userData.docs[0].data() as userInterface;

            return new UserModel(id as string, userEmail);
        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }
    }

    async getUserById(userId: string) {
        try {
            const userCollection = db.collection("users");

            const querySnapshot = userCollection
                .where("id", "==", userId);

            const userData = await querySnapshot.get();

            if (userData.empty) throw CustomError.badRequest("Email not exist");

            const { id, email } = userData.docs[0].data() as userInterface;

            return new UserModel(id as string, email);
        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }
    }
}
