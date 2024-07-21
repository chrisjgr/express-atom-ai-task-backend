
/* eslint-disable require-jsdoc */

import { TaskInterface } from "../interfaces";

type TaskModelParams = {
    userId: string;
    title: string;
    description: string;
    creationDate: Date;
    isCompleted?: boolean;
    isImportant?: boolean;
    id?: string;
    listId?: string;
}

export class TaskModel {
    private id: string;
    private title: string;
    private description: string;
    private creationDate: Date;
    private userId: string;
    private listId: string;
    private isCompleted: boolean;
    private isImportant: boolean;

    constructor(
        {
            userId,
            title,
            description,
            creationDate,
            isCompleted = false,
            isImportant = false,
            listId = "",
            id = "",
        }: TaskModelParams
    ) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.creationDate = creationDate;
        this.userId = userId;
        this.isCompleted = isCompleted;
        this.isImportant = isImportant;
        this.listId = listId;
    }

    getId() {
        return this.id;
    }
    getListId() {
        return this.listId;
    }

    getTitle() {
        return this.title;
    }

    getDescription() {
        return this.description;
    }

    getCreationDate() {
        return this.creationDate;
    }

    getUserId() {
        return this.userId;
    }

    getIsCompleted() {
        return this.isCompleted;
    }

    getIsImportant() {
        return this.isImportant;
    }

    setTitle(title: string) {
        this.title = title;
    }

    setListId(listId: string) {
        this.listId = listId;
    }

    setDescription(description: string) {
        this.description = description;
    }

    setCreationDate(creationDate: Date) {
        this.creationDate = creationDate;
    }

    setIsCompleted(isCompleted: boolean) {
        this.isCompleted = isCompleted;
    }

    setIsImportant(isImportant: boolean) {
        this.isImportant = isImportant;
    }

    toJson(): TaskInterface {
        return {
            id: this.id != "" ? this.id : undefined,
            title: this.title,
            description: this.description,
            creation_date: this.creationDate,
            userId: this.userId,
            isCompleted: this.isCompleted,
            isImportant: this.isImportant,
            listId: this.listId != "" ? this.listId : undefined,
        };
    }
}
