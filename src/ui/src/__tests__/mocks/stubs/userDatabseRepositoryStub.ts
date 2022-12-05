import { DatabaseRepository, QueryOptions } from "@domain/repositories"

export class UserDatabaseRepositoryStub implements DatabaseRepository {
    getOneById<T>(id: string): Promise<T> {
        return Promise.resolve({} as T)
    }
    getAll<T>(args?: QueryOptions | undefined): Promise<T[]> {
        return Promise.resolve([])
    }
    createOrReplace(data: any, id?: string | undefined): Promise<void> {
        return Promise.resolve()
    }
    update(data: any, id: string): Promise<void> {
        return Promise.resolve()
    }
    delete(id: string): Promise<void> {
        return Promise.resolve()
    }
}