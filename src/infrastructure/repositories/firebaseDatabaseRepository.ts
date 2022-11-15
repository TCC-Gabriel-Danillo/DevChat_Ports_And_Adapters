import { getFirestore, setDoc, doc, Firestore, collection, query, getDocs  } from 'firebase/firestore';
import { DatabaseRepository } from '../../domain/repositories';

export class FirebaseDatabaseRepository implements DatabaseRepository {
    private readonly firestore: Firestore = getFirestore()

    constructor(private readonly collection: string){}

    async getAll<T>(): Promise<T[]> {
        const docsRef = query(collection(this.firestore, this.collection));
        const docsSnap = await getDocs(docsRef)

        const result: T[] = []
        
        docsSnap.forEach(snap => {
            const data = snap.data() as T
            result.push(data)
        })
        return result
    }
    
    async createOrReplace(data: any, key?: string){
        await setDoc(doc(collection(this.firestore, this.collection), key), data)
    }
}