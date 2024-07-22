/* eslint-disable require-jsdoc */

import { RolInterface, userInterface } from "../interfaces/user.interface";

import { db } from "../config";
import { CustomError } from "../utils";
import { UserModel } from "../models";
import { firebaseCollection, userRol } from "../enums";

export class UserRepository {
    async getUserByEmail(email: string) {
        try {
            const userCollection = db.collection("users");

            const querySnapshot = userCollection
                .where("email", "==", email);

            const userData = await querySnapshot.get();

            if (userData.empty) throw CustomError.badRequest("Email not exist");

            const { email: userEmail, id, rol } = userData.docs[0].data() as userInterface;

            return new UserModel(userEmail, rol, id as string);
        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }
    }


    async getUserById(userId: string) {
        try {
            const userCollection = db.collection(firebaseCollection.users);

            const querySnapshot = userCollection
                .where("id", "==", userId);

            const userData = await querySnapshot.get();

            if (userData.empty) throw CustomError.badRequest("User not exist");

            const { id, email, rol } = userData.docs[0].data() as userInterface;

            return new UserModel(email, rol, id as string,);
        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }
    }

    async createUser(email: string, rol: userRol) {
        try {
            const user = await db.collection(firebaseCollection.users).where("email", "==", email).get();

            console.log({ user: user.docs[0] });


            if (!user.empty) throw CustomError.badRequest("Email already exist");

            const userCollection = db.collection(firebaseCollection.users);
            const rolCollection = db.collection(firebaseCollection.rol);

            const rolQuerySnapshot = rolCollection.where("title", "==", rol);
            const rolData = await rolQuerySnapshot.get();

            console.log({ rol: rol });


            if (rolData.empty) throw CustomError.badRequest("Rol not exist");

            const userRol = rolData.docs[0].data() as RolInterface;

            const userDoc = userCollection.doc();
            const newUser = new UserModel(email, userRol.title, userDoc.id);

            await userDoc.set(newUser.toJson());

            return newUser;
        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }
    }
}

export const AuthRepositoryInstance = new UserRepository();
