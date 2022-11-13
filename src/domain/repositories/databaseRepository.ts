export interface DatabaseRepository {
    getAll<T>(): Promise<T[]> 
    createOrReplace(data: any, key?: string): Promise<void>
}