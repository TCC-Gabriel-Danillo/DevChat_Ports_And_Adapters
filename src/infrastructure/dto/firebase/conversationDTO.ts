import { Conversation, User } from "@domain/entities/models";

export interface FirebaseConversationDTO {
    id: string
    lastMessage: string; 
    unreadNumber: number; 
    users: string[]
}

export const mapFirebaseConversationToConversation = (firebaseConversation: FirebaseConversationDTO, users: User[]): Conversation => {
    return {
        id: firebaseConversation.id,
        lastMessage: firebaseConversation.lastMessage, 
        unreadNumber: firebaseConversation.unreadNumber, 
        users
    }
}