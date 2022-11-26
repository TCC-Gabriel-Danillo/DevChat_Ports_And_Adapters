import { ConversationService } from "@domain/services"
import { 
    FirebaseDatabaseRepository, 
    FirebaseRealtimeDatabaseRepository 
} from "@infrastructure/repositories"



import { FIREBASE_COLLECTION } from "../constants"
import { ConversationContextProvider } from "../context"

interface Props {
    children: JSX.Element
}
export function ConvesationProviderComposer({ children }: Props){
    const conversationDatabaseRepository = new FirebaseDatabaseRepository(FIREBASE_COLLECTION.CONVERSATIONS)
    const userDatabaseRepository = new FirebaseDatabaseRepository(FIREBASE_COLLECTION.USERS)
    const conversationRealTimeDatabaseRepository = new FirebaseRealtimeDatabaseRepository(FIREBASE_COLLECTION.CONVERSATIONS)

    const conversationService = new ConversationService(
        conversationDatabaseRepository, 
        userDatabaseRepository, 
        conversationRealTimeDatabaseRepository
    )

    return(
        <ConversationContextProvider conversationService={conversationService}>
            {children}
        </ConversationContextProvider>
    )
}