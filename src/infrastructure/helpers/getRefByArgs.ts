import { 
    CollectionReference,
    DocumentData,
    query, 
    where, 
    Query
} from 'firebase/firestore';
import { Args } from '../../domain/repositories/database/options';


export const getRefFromArgs = (collection: CollectionReference<DocumentData>, args?: Args): Query<DocumentData> => {
    if(args) return query(collection, where(args.field, args.op, args.value)); 
    return query(collection);
}