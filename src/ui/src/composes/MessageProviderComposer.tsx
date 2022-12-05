import { FirebaseDatabaseRepository, FirebaseRealtimeDatabaseRepository } from "@infrastructure/repositories"
import { MessageService } from "@domain/services"
import { FIREBASE_COLLECTION } from "../constants"
import { MessageContextProvider } from "../context"
import { Conversation } from "@domain/entities/models"

interface Props {
    children: JSX.Element
    conversation: Conversation
}

export function MessageProviderComposer({ children, conversation }: Props) {
    const messageDatabaseRepository = new FirebaseDatabaseRepository(
        FIREBASE_COLLECTION.CONVERSATIONS,
        conversation.id,
        FIREBASE_COLLECTION.MESSAGES
    )
    const messageRealtimeDatabaseRepository = new FirebaseRealtimeDatabaseRepository(
        FIREBASE_COLLECTION.CONVERSATIONS,
        conversation.id,
        FIREBASE_COLLECTION.MESSAGES
    )
    const userDatabaseRepository = new FirebaseDatabaseRepository(FIREBASE_COLLECTION.USERS);

    const messageService = new MessageService(
        messageDatabaseRepository,
        messageRealtimeDatabaseRepository,
        userDatabaseRepository
    )

    return (
        <MessageContextProvider
            messageService={messageService}
            conversation={conversation}
        >
            {children}
        </MessageContextProvider>
    )
}