/* eslint-disable require-jsdoc */
import { db } from "../config";
import { CustomError } from "../utils";
import { firebaseCollection } from "../enums";
import { TaskModel } from "../models";
import { TaskInterface } from "../interfaces";
import { createTaskParams, updateTaskParams } from "../types";

class TaskRepository {
    private taskCollection = db.collection(firebaseCollection.tasks);

    async createTask({
        title,
        description,
        isCompleted,
        isImportant,
        listId,
        userId,
    }: createTaskParams
    ) {
        try {
            const taskDoc = this.taskCollection.doc();
            const newTask = new TaskModel({
                title,
                description,
                isCompleted,
                isImportant,
                listId,
                userId,
                creationDate: new Date(),
            });

            await taskDoc.create(newTask.toJson());

            return newTask;
        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }
    }

    async getAllTasksByUserId(userId: string) {
        try {
            const querySnapshot = this.taskCollection
                .where("userId", "==", userId);

            const taskData = await querySnapshot.get();

            if (taskData.empty) throw CustomError.badRequest("This user doesn't have any task");

            const tasks = taskData.docs.map((doc) => doc.data()) as TaskInterface[];

            return tasks.map((task) => this.mapTaskToModel(task));
        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }
    }

    async getTaskById(taskId: string) {
        try {
            const querySnapshot = this.taskCollection.doc(taskId);

            const taskData = await querySnapshot.get();

            if (!taskData.exists) throw CustomError.badRequest("This task doesn't exist");

            const task = taskData.data() as TaskInterface;

            return this.mapTaskToModel(task);
        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }
    }

    async updateTask(taskId: string, taskUpdateParams: updateTaskParams) {
        const { title, description, isCompleted, isImportant, listId } = taskUpdateParams;

        try {
            const querySnapshot = this.taskCollection.doc(taskId);

            const taskDoc = await querySnapshot.get();

            if (!taskDoc.exists) throw CustomError.badRequest("This task doesn't exist");

            const taskData = taskDoc.data() as TaskInterface;

            const newTask = {
                title: title || taskData.title,
                description: description || taskData.description,
                isCompleted: isCompleted || taskData.isCompleted,
                isImportant: isImportant || taskData.isImportant,
                listId: listId || taskData.listId,
            };

            await querySnapshot.update(newTask);

            return this.mapTaskToModel({ ...taskData, ...newTask });
        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }
    }

    async deleteTask(taskId: string) {
        try {
            await this.getTaskById(taskId);

            const querySnapshot = this.taskCollection.doc(taskId);

            await querySnapshot.delete();

            return true;
        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }
    }

    async getTaskByListId(listId: string) {
        try {
            const querySnapshot = this.taskCollection.where("listId", "==", listId);

            const taskData = await querySnapshot.get();

            if (taskData.empty) throw CustomError.badRequest("Task doesn't exist wit this listId");

            const tasks = taskData.docs.map((doc) => doc.data()) as TaskInterface[];

            return tasks.map((task) => this.mapTaskToModel(task));
        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }
    }

    private mapTaskToModel(tasks: TaskInterface) {
        return new TaskModel({
            id: tasks.id,
            creationDate: tasks.creation_date,
            description: tasks.description,
            title: tasks.title,
            userId: tasks.userId,
            isCompleted: tasks.isCompleted,
            isImportant: tasks.isImportant,
            listId: tasks.listId !== undefined ? tasks.listId : undefined,
        });
    }
}

export const TasksRepositoryInstance = new TaskRepository();
