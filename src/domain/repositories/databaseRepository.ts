export interface DatabaseRepository {
    getAll<T>(): Promise<T[]> 
    create(data: any): Promise<void>
}