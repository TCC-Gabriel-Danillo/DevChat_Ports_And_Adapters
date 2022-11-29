import { Conversation, User } from "../../../domain/entities/models";
import { Timestamp } from "@firebase/firestore";

export interface FirebaseConversationDTO {
    id: string
    unreadNumber: number
    users: string[]
    createdAt: Timestamp
    updatedAt: Timestamp
    tech: string
    lastSenderId: string
}

export const mapFirebaseConversationToConversation = (
    firebaseConversation: FirebaseConversationDTO,
    users: User[]
): Conversation => {
    return {
        id: firebaseConversation.id,
        unreadNumber: firebaseConversation.unreadNumber,
        users,
        createdAt: firebaseConversation.createdAt.toDate(),
        updatedAt: firebaseConversation.updatedAt.toDate(),
        tech: firebaseConversation.tech,
        lastSenderId: firebaseConversation.lastSenderId
    }
}

export const mapConversationToFirebaseConversation = (conversation: Conversation): FirebaseConversationDTO => {
    return {
        id: conversation.id,
        tech: conversation.tech,
        unreadNumber: conversation.unreadNumber,
        users: conversation.users.map(user => user.id),
        createdAt: Timestamp.fromDate(conversation.createdAt),
        updatedAt: Timestamp.fromDate(conversation.updatedAt),
        lastSenderId: conversation.lastSenderId
    }
}