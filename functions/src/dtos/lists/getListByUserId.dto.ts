/* eslint-disable require-jsdoc */
export class GetListsByUserIdDto {
    private constructor(
        public userId: string,
    ) { }

    static create(object: { [key: string]: any }): [string?, GetListsByUserIdDto?] {
        const { userId } = object;

        if (!userId) return ["Missing userId"];

        if (typeof userId !== "string") return ["id is not valid, must be a string"];

        return [undefined, new GetListsByUserIdDto(userId)];
    }
}
