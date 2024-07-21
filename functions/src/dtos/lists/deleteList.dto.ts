/* eslint-disable require-jsdoc */
export class DeleteListDto {
    private constructor(
        public id: string,
    ) { }

    static create(object: { [key: string]: any }): [string?, DeleteListDto?] {
        const { id } = object;

        if (!id) return ["Missing id"];

        if (typeof id !== "string") return ["id is not valid, must be a string"];

        return [undefined, new DeleteListDto(id)];
    }
}
