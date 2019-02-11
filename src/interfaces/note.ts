export interface INote {
    id?: number,
    title: string,
    description: string,
    created: Date,
    isDone: boolean,
    isArchived: boolean
}