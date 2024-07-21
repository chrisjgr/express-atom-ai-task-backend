import { ListInterface } from "../interfaces";

/* eslint-disable require-jsdoc */
export class ListModel {
    id: string;
    title: string;
    userId: string;

    constructor(title: string, userId: string, id = "") {
        this.id = id;
        this.title = title;
        this.userId = userId;
    }

    getId() {
        return this.id;
    }

    getTitle() {
        return this.title;
    }

    getUserId() {
        return this.userId;
    }

    setTitle(title: string) {
        this.title = title;
    }

    toJson(): ListInterface {
        return {
            id: this.id != "" ? this.id : undefined,
            title: this.title,
            userId: this.userId,
        };
    }
}
