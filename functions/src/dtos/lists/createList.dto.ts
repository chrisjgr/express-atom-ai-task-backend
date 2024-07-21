/* eslint-disable require-jsdoc */
export class CreateListDto {
    private constructor(
        public title: string,
        public userId: string,
    ) { }

    static create(object: { [key: string]: any }): [string?, CreateListDto?] {
        const { title, userId } = object;

        if (!title) return ["Missing title"];
        if (!userId) return ["Missing userId"];

        if (typeof title !== "string") return ["title is not valid, must be a string"];
        if (typeof userId !== "string") return ["userId is not valid, must be a string"];


        return [undefined, new CreateListDto(title, userId)];
    }
}
