import { 
    getFirestore, 
    setDoc, 
    doc, 
    Firestore,  
    getDocs, 
    updateDoc,
    deleteDoc, 
} from 'firebase/firestore';

import { FilterArgs, DatabaseRepository } from '../../domain/repositories';
import { 
    parseFirebaseSnapshot, 
    parseCollection, 
    getRefFromArgs 
} from "../helpers"
export class FirebaseDatabaseRepository implements DatabaseRepository {
    private readonly firestore: Firestore = getFirestore()
    private readonly collections: string[]

    constructor(...collections: string[]){
        this.collections = collections
    }

    get collection() {
        return parseCollection(this.collections, this.firestore)
    }

    async getAll<T>(args?: FilterArgs): Promise<T[]> {
        const docsRef = getRefFromArgs(this.collection, args); 
        const docsSnap = await getDocs(docsRef)
        return parseFirebaseSnapshot<T>(docsSnap)
    }
    
    async createOrReplace(data: any, id?: string){
        await setDoc(doc(this.collection, id), data)
    }

    async update(data: any, id: string): Promise<void> {
        await updateDoc(doc(this.collection, id), data)
    }

    async delete(id: string) {
        await deleteDoc(doc(this.collection, id))
    }  

 
}

