/* eslint-disable require-jsdoc */

export class HasUserDto {
    private constructor(
        public user: string,
    ) { }

    static create(object: { [key: string]: any }): [string?, HasUserDto?] {
        const { user } = object;

        if (!user) return ["Missing user"];

        if (typeof user !== "string") return ["user is not valid, must be a string"];

        return [undefined, new HasUserDto(user)];
    }
}
