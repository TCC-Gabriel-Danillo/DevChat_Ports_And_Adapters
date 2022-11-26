import { FirebaseDatabaseRepository, FirebaseRealtimeDatabaseRepository } from "@infrastructure/repositories"
import { MessageService } from "@domain/services"
import { FIREBASE_COLLECTION } from "../constants"
import { MessageContextProvider } from "../context"

interface Props {
    children: JSX.Element
    conversationId: string
}

export function MessageProviderComposer({ children, conversationId }: Props){
    const messageDatabaseRepository = new FirebaseDatabaseRepository(
        FIREBASE_COLLECTION.CONVERSATIONS, 
        conversationId,
        FIREBASE_COLLECTION.MESSAGES
    )
    const messageRealtimeDatabaseRepository = new FirebaseRealtimeDatabaseRepository(
        FIREBASE_COLLECTION.CONVERSATIONS, 
        conversationId,
        FIREBASE_COLLECTION.MESSAGES
    )
    const userDatabaseRepository = new FirebaseDatabaseRepository(FIREBASE_COLLECTION.USERS); 
    const messageService = new MessageService(
        messageDatabaseRepository, 
        messageRealtimeDatabaseRepository, 
        userDatabaseRepository
    )

    return(
        <MessageContextProvider messageService={messageService}>
            {children}
        </MessageContextProvider>
    )
}