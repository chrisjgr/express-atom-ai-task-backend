/* eslint-disable require-jsdoc */
export class UpdateListDto {
    private constructor(
        public title: string,
        public id: string,
    ) { }

    static create(object: { [key: string]: any }): [string?, UpdateListDto?] {
        const { title, id } = object;

        if (!title) return ["Missing title"];
        if (!id) return ["Missing id"];

        if (typeof title !== "string") return ["title is not valid, must be a string"];
        if (typeof id !== "string") return ["id is not valid, must be a string"];

        return [undefined, new UpdateListDto(title, id)];
    }
}
