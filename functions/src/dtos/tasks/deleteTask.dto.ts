/* eslint-disable require-jsdoc */
export class DeleteTaskDto {
    private constructor(
        public id: string,
    ) { }

    static create(object: { [key: string]: any }): [string?, DeleteTaskDto?] {
        const {
            id,
        } = object;


        if (!id || id === "") return ["Missing id"];

        if (typeof id !== "string") return ["id is not valid, must be a string"];

        return [undefined, new DeleteTaskDto(
            id,
        )];
    }
}
