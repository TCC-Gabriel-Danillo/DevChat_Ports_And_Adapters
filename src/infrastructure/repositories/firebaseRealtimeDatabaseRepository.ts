import { Unsubscribe } from '@firebase/util';
import { parseFirebaseSnapshot, parseCollection, getRefFromArgs } from '@infrastructure/helpers';
import { 
    getFirestore, 
    Firestore, 
    onSnapshot,  
} from 'firebase/firestore';
import { FilterArgs, RealtimeDatabaseRepository, VoidCallback } from "../../domain/repositories"

export class FirebaseRealtimeDatabaseRepository  implements RealtimeDatabaseRepository {
    private unsubscribeFunction?: Unsubscribe

    private readonly firestore: Firestore = getFirestore()
    private readonly collections: string[]

    constructor(...collections: string[]){
        this.collections = collections
    }

    watch<T>(cb: VoidCallback<T>, args: FilterArgs): void {
        const collection = parseCollection(this.collections, this.firestore)
        const q = getRefFromArgs(collection, args);
        this.unsubscribeFunction = onSnapshot(q, (querySnapShot) => {
            const docs = parseFirebaseSnapshot<T>(querySnapShot)
            cb(docs)
        });
    }

    unwatch(): void{
        this.unsubscribeFunction?.()
    }
}
