import { FilterArgs } from "./options"

export type VoidCallback<T>= (data: T[]) => void; 

export interface RealtimeDatabaseRepository {
    watch<T>(cb: VoidCallback<T>, args?: FilterArgs): void 
    unwatch(): void
}