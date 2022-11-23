export interface DatabaseRepository {
    getAll<T>(): Promise<T[]> 
    createOrReplace(data: any, id?: string): Promise<void>
    update(data: any, id: string): Promise<void>
    delete(id: string): Promise<void>
}