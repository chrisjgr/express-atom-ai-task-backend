export type createTaskParams = {
    title: string;
    description: string;
    isCompleted: boolean;
    isImportant: boolean;
    listId: string | null;
    userId: string;
};

export type updateTaskParams = {
    title?: string;
    description?: string;
    isCompleted?: boolean;
    isImportant?: boolean;
    listId?: string;
};
