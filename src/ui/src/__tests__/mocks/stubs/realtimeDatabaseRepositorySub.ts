import { QueryOptions, RealtimeDatabaseRepository, VoidCallback } from "@domain/repositories";

export class RealtimeDatabaseRepositoryStub implements RealtimeDatabaseRepository {
    watch<T>(cb: VoidCallback<T>, args?: QueryOptions | undefined): void {
        cb([])
    }
    unwatch(): void {
        throw new Error("Method not implemented.");
    }
}