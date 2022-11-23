import { Unsubscribe } from '@firebase/util';
import { 
    getFirestore, 
    setDoc, 
    doc, 
    Firestore, 
    collection, 
    query, 
    getDocs, 
    onSnapshot,  
    CollectionReference,
    DocumentData,
    updateDoc,
    deleteDoc
} from 'firebase/firestore';

import { DatabaseRepository } from '../../domain/repositories';
export class FirebaseDatabaseRepository implements DatabaseRepository {
    private readonly firestore: Firestore = getFirestore()
    private unsubscribeFunction?: Unsubscribe
    private readonly collection: string[]

    constructor(...collection: string[]){
        this.collection = collection
    }

    private parseCollection(): CollectionReference<DocumentData>{
        if(this.collection.length > 1){
            return collection.apply(null, [this.firestore, ...this.collection])
        }

        return collection(this.firestore, this.collection[0])
    }

    async getAll<T>(): Promise<T[]> {
        const docsRef = query(this.parseCollection());
        const docsSnap = await getDocs(docsRef)

        const result: T[] = []
        
        docsSnap.forEach(snap => {
            const data = snap.data() as T
            result.push(data)
        })
        return result
    }
    
    async createOrReplace(data: any, id?: string){
        await setDoc(doc(this.parseCollection(), id), data)
    }

    async update(data: any, id: string): Promise<void> {
        await updateDoc(doc(this.parseCollection(), id), data)
    }

    async delete(id: string) {
        await deleteDoc(doc(this.parseCollection(), id))
    }


    /** @TODO maybe this could be a separated class "real time database" */  
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