import { Conversation, User } from "@domain/entities/models";

export interface FirebaseConversationDTO {
    lastMessage: string; 
    unreadNumber: number; 
    users: string[]
}

export const mapFirebaseConversationToConversation = (firebaseConversation: FirebaseConversationDTO, users: User[]): Conversation => {
    return {
        lastMessage: firebaseConversation.lastMessage, 
        unreadNumber: firebaseConversation.unreadNumber, 
        users
    }
}