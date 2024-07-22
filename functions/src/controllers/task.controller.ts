/* eslint-disable require-jsdoc */
import { Request, Response } from "express";

import { TaskServiceInstance } from "../services";
import { ErrorManager } from "../utils";

import {
    CreateTaskDto,
    DeleteTaskDto,
    GetAllTaskByUserIdDto,
    GetTaskByIdDto,
    GetTaskByListIdDto,
    UpdateTaskDto,
} from "../dtos";


export class TaskController {
    createTask(req: Request, res: Response) {
        const [error, createTaskDto] = CreateTaskDto.create(req.body);
        if (error) return res.status(400).json({ error });

        TaskServiceInstance.createTask(createTaskDto as CreateTaskDto)
            .then((task) => res.status(201).json(task))
            .catch((error) => ErrorManager.handleError(error, res));

        return;
    }

    getAllUserTask(req: Request, res: Response) {
        const [error, getAllTaskByUserIdDto] = GetAllTaskByUserIdDto.create({ userId: req.params.userId });

        if (error) return res.status(400).json({ error });


        TaskServiceInstance.getAllTaskByUserId(getAllTaskByUserIdDto as GetAllTaskByUserIdDto)
            .then((tasks) => res.status(200).json(tasks))
            .catch((error) => ErrorManager.handleError(error, res));

        return;
    }

    getTaskById(req: Request, res: Response) {
        const [error, getTaskByIdDto] = GetTaskByIdDto.create({ id: req.params.id });

        if (error) return res.status(400).json({ error });

        TaskServiceInstance.getTaskById(getTaskByIdDto as GetTaskByIdDto)
            .then((tasks) => res.status(200).json(tasks))
            .catch((error) => ErrorManager.handleError(error, res));

        return;
    }

    getTasksByList(req: Request, res: Response) {
        const [error, getTaskByListId] = GetTaskByListIdDto.create({ listId: req.params.listId });

        if (error) return res.status(400).json({ error });

        TaskServiceInstance.getTaskByListId(getTaskByListId as GetTaskByListIdDto)
            .then((tasks) => res.status(200).json(tasks))
            .catch((error) => {
                return ErrorManager.handleError(error, res);
            });

        return;
    }

    updateTask(req: Request, res: Response) {
        const [error, updateTaskDto] = UpdateTaskDto.create({ id: req.params.id, ...req.body });

        if (error) return res.status(400).json({ error });

        TaskServiceInstance.updateTask(updateTaskDto as UpdateTaskDto)
            .then((task) => res.status(200).json(task))
            .catch((error) => ErrorManager.handleError(error, res));

        return;
    }

    deleteTask(req: Request, res: Response) {
        const [error, deleteTaskDto] = DeleteTaskDto.create(req.params);

        if (error) return res.status(400).json({ error });

        TaskServiceInstance.deleteTask(deleteTaskDto as DeleteTaskDto)
            .then((task) => res.status(200).json(task))
            .catch((error) => ErrorManager.handleError(error, res));

        return;
    }
}

export const TaskControllerInstance = new TaskController();
