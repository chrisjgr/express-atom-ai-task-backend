/* eslint-disable require-jsdoc */

import { Request, Response } from "express";
import { ListService } from "../services";

import { CreateListDto, GetListByIdDto, GetListsByUserIdDto, UpdateListDto, DeleteListDto } from "../dtos";
import { ErrorManager } from "../utils";

export class ListController {
    constructor(
        private listService: ListService,
    ) { }

    createLis(req: Request, res: Response) {
        const [error, createListDto] = CreateListDto.create(req.body);
        if (error) return res.status(400).json({ error });

        this.listService.createList(createListDto as CreateListDto)
            .then((list) => res.status(201).json(list))
            .catch((error) => ErrorManager.handleError(error, res));

        return;
    }

    getList(req: Request, res: Response) {
        const [error, getListByIdDto] = GetListByIdDto.create({ id: req.params.id });
        if (error) return res.status(400).json({ error });

        this.listService.getListById(getListByIdDto as GetListByIdDto)
            .then((list) => res.status(200).json(list))
            .catch((error) => ErrorManager.handleError(error, res));

        return;
    }

    getListByUser(req: Request, res: Response) {
        const [error, getListsByUserIdDto] = GetListsByUserIdDto.create({ userId: req.query.userId });
        if (error) return res.status(400).json({ error });

        this.listService.getAllListByUser(getListsByUserIdDto as GetListsByUserIdDto)
            .then((list) => res.status(200).json(list))
            .catch((error) => ErrorManager.handleError(error, res));

        return;
    }

    updateList(req: Request, res: Response) {
        const [error, updateListDto] = UpdateListDto.create({ id: req.params.id, ...req.body });
        if (error) return res.status(400).json({ error });

        this.listService.updateList(updateListDto as UpdateListDto)
            .then((list) => res.status(200).json(list))
            .catch((error) => ErrorManager.handleError(error, res));

        return;
    }


    deleteList(req: Request, res: Response) {
        const [error, deleteListDto] = DeleteListDto.create({ id: req.params.id });
        if (error) return res.status(400).json({ error });

        this.listService.deleteList(deleteListDto as DeleteListDto)
            .then((list) => res.status(200).json(list))
            .catch((error) => ErrorManager.handleError(error, res));

        return;
    }
}
