/* eslint-disable require-jsdoc */
export class GetAllTaskByUserIdDto {
    private constructor(
        public userId: string,
    ) { }

    static create(object: { [key: string]: any }): [string?, GetAllTaskByUserIdDto?] {
        const {
            userId,
        } = object;

        if (!userId || userId === "") return ["Missing userId"];

        if (typeof userId !== "string") return ["userId is not valid, must be a string"];

        return [undefined, new GetAllTaskByUserIdDto(
            userId,
        )];
    }
}
