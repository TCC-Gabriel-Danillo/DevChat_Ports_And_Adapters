

export enum OP {
    EQ = "==", 
    CONTAINS = "array-contains",
    IN = "in"
}
export interface Args {
    field: string; 
    op: OP; 
    value: any
}
export interface DatabaseRepository {
    getAll<T>(args?: Args): Promise<T[]> 
    createOrReplace(data: any, id?: string): Promise<void>
    update(data: any, id: string): Promise<void>
    delete(id: string): Promise<void>
}