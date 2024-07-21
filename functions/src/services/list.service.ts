/* eslint-disable require-jsdoc */

import { CreateListDto, DeleteListDto, GetListByIdDto, GetListsByUserIdDto, UpdateListDto } from "../dtos";
import { ListRepository } from "../repositories";

export class ListService {
    constructor(
        private listRepository: ListRepository,
    ) { }

    async getAllListByUser({ userId }: GetListsByUserIdDto) {
        const listsModels = await this.listRepository.getAllListByUser(userId);

        return listsModels.map((list) => list.toJson());
    }

    async getListById({ id }: GetListByIdDto) {
        const listModel = await this.listRepository.getListById(id);

        return listModel.toJson();
    }

    async createList({ title, userId }: CreateListDto) {
        const listModel = await this.listRepository.createList(title, userId);

        return listModel.toJson();
    }
    async updateList({ listId, title }: UpdateListDto) {
        const listModel = await this.listRepository.updateList(listId, title);

        return listModel.toJson();
    }

    async deleteList({ id }: DeleteListDto) {
        return await this.listRepository.deleteList(id);
    }
}
