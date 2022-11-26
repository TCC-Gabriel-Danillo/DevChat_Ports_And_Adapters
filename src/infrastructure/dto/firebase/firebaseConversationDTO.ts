import { Conversation, User } from "@domain/entities/models";
import { Timestamp } from "@firebase/firestore";

export interface FirebaseConversationDTO {
    id: string
    lastMessage: string 
    unreadNumber: number
    users: string[]
    createdAt: Timestamp
    updatedAt: Timestamp
    tech: string
}

export const mapFirebaseConversationToConversation = (
    firebaseConversation: FirebaseConversationDTO, 
    users: User[]
): Conversation => {
    return {
        id: firebaseConversation.id,
        lastMessage: firebaseConversation.lastMessage, 
        unreadNumber: firebaseConversation.unreadNumber, 
        users,
        createdAt: firebaseConversation.createdAt.toDate(), 
        updatedAt: firebaseConversation.updatedAt.toDate(), 
        tech: firebaseConversation.tech

    }
}