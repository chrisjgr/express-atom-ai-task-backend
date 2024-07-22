/* eslint-disable require-jsdoc */

import { Request, Response } from "express";
import { ListServiceInstance } from "../services";

import { CreateListDto, GetListByIdDto, GetListsByUserIdDto, UpdateListDto, DeleteListDto } from "../dtos";
import { ErrorManager } from "../utils";

class ListController {
    createList(req: Request, res: Response) {
        const [error, createListDto] = CreateListDto.create(req.body);
        if (error) return res.status(400).json({ error });

        ListServiceInstance.createList(createListDto as CreateListDto)
            .then((list) => res.status(201).json(list))
            .catch((error) => ErrorManager.handleError(error, res));

        return;
    }

    getList(req: Request, res: Response) {
        const [error, getListByIdDto] = GetListByIdDto.create({ id: req.params.id });
        if (error) return res.status(400).json({ error });

        ListServiceInstance.getListById(getListByIdDto as GetListByIdDto)
            .then((list) => res.status(200).json(list))
            .catch((error) => ErrorManager.handleError(error, res));

        return;
    }

    getListByUser(req: Request, res: Response) {
        const [error, getListsByUserIdDto] = GetListsByUserIdDto.create({ userId: req.query.userId });
        if (error) return res.status(400).json({ error });

        ListServiceInstance.getAllListByUser(getListsByUserIdDto as GetListsByUserIdDto)
            .then((list) => res.status(200).json(list))
            .catch((error) => ErrorManager.handleError(error, res));

        return;
    }

    updateList(req: Request, res: Response) {
        const [error, updateListDto] = UpdateListDto.create({ id: req.params.id, ...req.body });
        if (error) return res.status(400).json({ error });

        ListServiceInstance.updateList(updateListDto as UpdateListDto)
            .then((list) => res.status(200).json(list))
            .catch((error) => ErrorManager.handleError(error, res));

        return;
    }


    deleteList(req: Request, res: Response) {
        const [error, deleteListDto] = DeleteListDto.create({ id: req.params.id });
        if (error) return res.status(400).json({ error });

        ListServiceInstance.deleteList(deleteListDto as DeleteListDto)
            .then((list) => res.status(200).json(list))
            .catch((error) => ErrorManager.handleError(error, res));

        return;
    }
}

export const ListControllerInstance = new ListController();
