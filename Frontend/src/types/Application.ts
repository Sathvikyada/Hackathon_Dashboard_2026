export type ApplicationAnswer =
    | string
    | number
    | string[]
    | boolean
    | File
    | null;

export interface Application {
    lastModified: string;
    answers: Record<string, ApplicationAnswer>;
}