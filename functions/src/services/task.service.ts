/* eslint-disable require-jsdoc */

import { CreateTaskDto, DeleteTaskDto, GetAllTaskByUserIdDto, GetTaskByListIdDto, UpdateTaskDto } from "../dtos";
import { GetTaskByIdDto } from "../dtos/tasks/getTaskById.dto";
import { TasksRepositoryInstance } from "../repositories";

class TaskService {
    async getAllTaskByUserId(params: GetAllTaskByUserIdDto) {
        const tasksModels = await TasksRepositoryInstance.getAllTasksByUserId(params.userId);

        return tasksModels.map((task) => task.toJson());
    }

    async getTaskById({ id }: GetTaskByIdDto) {
        const taskModel = await TasksRepositoryInstance.getTaskById(id);

        return taskModel.toJson();
    }

    async createTask(createTaskParams: CreateTaskDto) {
        const { userId, title, description, isCompleted, isImportant, listId } = createTaskParams;
        const taskModel = await TasksRepositoryInstance.createTask({
            userId,
            title,
            description,
            isCompleted,
            isImportant,
            listId,
        });

        return taskModel.toJson();
    }

    async updateTask(updateTaskParams: UpdateTaskDto) {
        const { description, id, title, listId, isCompleted, isImportant } = updateTaskParams;

        const taskModel = await TasksRepositoryInstance.updateTask(id, {
            description,
            title,
            listId,
            isCompleted,
            isImportant,
        });

        return taskModel.toJson();
    }

    async deleteTask({ id }: DeleteTaskDto) {
        return await TasksRepositoryInstance.deleteTask(id);
    }

    async getTaskByListId({ listId }: GetTaskByListIdDto) {
        const tasksModels = await TasksRepositoryInstance.getTaskByListId(listId);

        return tasksModels.map((task) => task.toJson());
    }
}

export const TaskServiceInstance = new TaskService();
