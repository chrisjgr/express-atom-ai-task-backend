export type createTaskParams = {
    title: string;
    description: string;
    isCompleted: boolean;
    isImportant: boolean;
    listId?: string;
    userId: string;
};

export type updateTaskParams = {
    title?: string;
    description?: string;
    isCompleted?: boolean;
    isImportant?: boolean;
    listId?: string;
};
