/* eslint-disable require-jsdoc */

import { db } from "../config";
import { CustomError } from "../utils";
import { firebaseCollection } from "../enums";
import { ListInterface } from "../interfaces";
import { ListModel } from "../models";


class ListRepository {
    private listCollection = db.collection(firebaseCollection.list);

    async getAllListByUser(userId: string) {
        try {
            const querySnapshot = this.listCollection
                .where("userId", "==", userId);

            const listData = await querySnapshot.get();

            if (listData.empty) throw CustomError.badRequest("This user doesn't have any list");

            const lists = listData.docs.map((doc) => doc.data()) as ListInterface[];

            return lists.map(({ id, title, userId }) => new ListModel(title, userId, id as string));
        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }
    }

    async getListById(listId: string) {
        try {
            const querySnapshot = this.listCollection
                .where("id", "==", listId);

            const listData = await querySnapshot.get();

            if (listData.empty) throw CustomError.badRequest("This list doesn't exist");

            const { id, title, userId } = listData.docs[0].data() as ListInterface;

            return new ListModel(title, userId, id as string);
        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }
    }

    async createList(title: string, userId: string) {
        try {
            const listDoc = this.listCollection.doc();
            const newList = new ListModel(title, userId, listDoc.id);

            await listDoc.create(newList.toJson());

            return newList;
        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }
    }

    async updateList(listId: string, title: string) {
        try {
            const querySnapshot = this.listCollection.doc(listId);

            const listDoc = await querySnapshot.get();

            if (!listDoc.exists) throw CustomError.badRequest("This list doesn't exist");

            const listData = listDoc.data() as ListInterface;

            const newList = {
                title: title || listData.title,
            };

            await querySnapshot.update(newList);

            return new ListModel(newList.title, listData.userId, listId);
        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }
    }

    async deleteList(listId: string) {
        try {
            await this.getListById(listId);

            const querySnapshot = this.listCollection.doc(listId);

            await querySnapshot.delete();

            return true;
        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }
    }
}

export const ListRepositoryInstance = new ListRepository();
