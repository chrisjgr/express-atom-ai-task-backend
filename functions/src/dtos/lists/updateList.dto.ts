/* eslint-disable require-jsdoc */
export class UpdateListDto {
    private constructor(
        public title: string,
        public listId: string,
    ) { }

    static create(object: { [key: string]: any }): [string?, UpdateListDto?] {
        const { title, listId } = object;

        if (!title) return ["Missing title"];
        if (!listId) return ["Missing listId"];

        if (typeof title !== "string") return ["title is not valid, must be a string"];
        if (typeof listId !== "string") return ["listId is not valid, must be a string"];

        return [undefined, new UpdateListDto(title, listId)];
    }
}
