/* eslint-disable require-jsdoc */

import { CreateListDto, DeleteListDto, GetListByIdDto, GetListsByUserIdDto, UpdateListDto } from "../dtos";
import { ListRepositoryInstance } from "../repositories";

class ListService {
    async getAllListByUser({ userId }: GetListsByUserIdDto) {
        const listsModels = await ListRepositoryInstance.getAllListByUser(userId);

        return listsModels.map((list) => list.toJson());
    }

    async getListById({ id }: GetListByIdDto) {
        const listModel = await ListRepositoryInstance.getListById(id);

        return listModel.toJson();
    }

    async createList({ title, userId }: CreateListDto) {
        const listModel = await ListRepositoryInstance.createList(title, userId);

        return listModel.toJson();
    }
    async updateList({ listId, title }: UpdateListDto) {
        const listModel = await ListRepositoryInstance.updateList(listId, title);

        return listModel.toJson();
    }

    async deleteList({ id }: DeleteListDto) {
        return await ListRepositoryInstance.deleteList(id);
    }
}

export const ListServiceInstance = new ListService();
