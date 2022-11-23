interface RealtimeDatabaseRepository {
    watch<T>(cb: (data: T | T[]) => void): void 
    unwatch(): void
}