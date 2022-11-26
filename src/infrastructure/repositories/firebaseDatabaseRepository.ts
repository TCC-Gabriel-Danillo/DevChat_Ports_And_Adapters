import { 
    getFirestore, 
    setDoc, 
    doc, 
    Firestore, 
    collection, 
    query, 
    getDocs, 
    CollectionReference,
    DocumentData,
    updateDoc,
    deleteDoc, 
    where
} from 'firebase/firestore';

import { Args, DatabaseRepository } from '../../domain/repositories';
import { parseFirebaseSnapshot } from "../helpers/parseFirebaseSnapshot"
export class FirebaseDatabaseRepository implements DatabaseRepository {
    private readonly firestore: Firestore = getFirestore()
    private readonly collection: string[]

    constructor(...collection: string[]){
        this.collection = collection
    }

    async getAll<T>(args?: Args): Promise<T[]> {
        const docsRef = this.getRefFromArgs(args); 
        const docsSnap = await getDocs(docsRef)
        return parseFirebaseSnapshot<T>(docsSnap)
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


    private parseCollection(): CollectionReference<DocumentData>{
        if(this.collection.length > 1){
            return collection.apply(null, [this.firestore, ...this.collection])
        }

        return collection(this.firestore, this.collection[0])
    }

    private getRefFromArgs(args?: Args){
        if(args) return query(this.parseCollection(), where(args.field, args.op, args.value)); 
        return query(this.parseCollection());
    }
}