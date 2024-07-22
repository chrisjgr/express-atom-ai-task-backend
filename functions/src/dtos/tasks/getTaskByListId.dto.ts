/* eslint-disable require-jsdoc */
export class GetTaskByListIdDto {
    private constructor(
        public listId: string,
    ) { }

    static create(object: { [key: string]: any }): [string?, GetTaskByListIdDto?] {
        const {
            listId,
        } = object;


        if (!listId || listId === "") return ["Missing listId"];

        if (typeof listId !== "string") return ["listId is not valid, must be a string"];

        return [undefined, new GetTaskByListIdDto(
            listId,
        )];
    }
}
