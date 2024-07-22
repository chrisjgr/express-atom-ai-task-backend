/* eslint-disable require-jsdoc */
export class UpdateTaskDto {
    private constructor(
        public title: string,
        public description: string,
        public isCompleted: boolean,
        public isImportant: boolean,
        public listId: string,
        public id: string,
    ) { }

    static create(object: { [key: string]: any }): [string?, UpdateTaskDto?] {
        const {
            title,
            description,
            isCompleted,
            isImportant,
            listId,
            id,
        } = object;

        if (title !== undefined && typeof title !== "string") return ["title is not valid, must be a string"];
        if (
            description !== undefined && typeof description !== "string"
        ) return ["description is not valid, must be a string"];

        if (
            isCompleted !== undefined && typeof isCompleted !== "boolean"
        ) return ["isCompleted is not valid, must be a boolean"];

        if (
            isImportant !== undefined && typeof isImportant !== "boolean"
        ) return ["isImportant is not valid, must be a boolean"];

        if (listId !== undefined && typeof listId !== "string") return ["listId is not valid, must be a string"];
        if (id !== undefined && typeof id !== "string") return ["id is not valid, must be a string"];


        return [undefined, new UpdateTaskDto(
            title,
            description,
            isCompleted,
            isImportant,
            listId,
            id
        )];
    }
}
