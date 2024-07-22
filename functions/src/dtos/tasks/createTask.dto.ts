/* eslint-disable require-jsdoc */
export class CreateTaskDto {
    private constructor(
        public title: string,
        public description: string,
        public isCompleted: boolean,
        public isImportant: boolean,
        public userId: string,
        public listId: string | null,
    ) { }

    static create(object: { [key: string]: any }): [string?, CreateTaskDto?] {
        const {
            title,
            userId,
            description,
            isCompleted,
            isImportant,
            listId = null,
        } = object;

        if (!title) return ["Missing title"];
        if (!description) return ["Missing description"];
        if (isCompleted === undefined) return ["Missing isCompleted"];
        if (isImportant === undefined) return ["Missing isImportant"];
        if (!userId) return ["Missing userId"];

        if (typeof title !== "string") return ["title is not valid, must be a string"];
        if (typeof description !== "string") return ["description is not valid, must be a string"];
        if (typeof isCompleted !== "boolean") return ["isCompleted is not valid, must be a boolean"];
        if (typeof isImportant !== "boolean") return ["isImportant is not valid, must be a boolean"];

        if (typeof userId !== "string") return ["userId is not valid, must be a string"];


        return [undefined, new CreateTaskDto(
            title,
            description,
            isCompleted,
            isImportant,
            userId,
            listId,
        )];
    }
}
