import { LocalStorageRepository } from "@domain/repositories";

export class LocalStorageRepositoryStub implements LocalStorageRepository {
    async getItem<T>(key: string): Promise<T | undefined> {
        return Promise.resolve({} as T);
    }
    async setItem(key: string, data: any): Promise<void> {
        return Promise.resolve()
    }
    async removeItem(key: string): Promise<void> {
        return Promise.resolve()
    }
}
