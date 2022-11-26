import { Unsubscribe } from '@firebase/util';
import { 
    getFirestore, 
    Firestore, 
    collection, 
    query, 
    onSnapshot,  
    CollectionReference,
    DocumentData,
} from 'firebase/firestore';
import { RealtimeDatabaseRepository } from "../../domain/repositories"

export class FirebaseRealtimeDatabaseRepository  implements RealtimeDatabaseRepository {
    private unsubscribeFunction?: Unsubscribe

    private readonly firestore: Firestore = getFirestore()
    private readonly collection: string[]

    constructor(...collection: string[]){
        this.collection = collection
    }

    private parseCollection(): CollectionReference<DocumentData> {
        if(this.collection.length > 1){
            return collection.apply(null, [this.firestore, ...this.collection])
        }
        return collection(this.firestore, this.collection[0])
    }

    watch<T>(cb: (data: T | T[]) => void): void {
        const q = query(this.parseCollection());
        this.unsubscribeFunction = onSnapshot(q, (querySnapShot) => {
            const docs: T[] = []
            querySnapShot.forEach(query => {
                docs.push(query.data() as T)
            })
            cb(docs)
        });
    }

    unwatch(): void{
        this.unsubscribeFunction?.()
    }
}
