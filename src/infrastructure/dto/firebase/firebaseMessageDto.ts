import { Timestamp } from "@firebase/firestore";
import { Message, User } from "../../../domain/entities/models";

export interface FirebaseMessageDTO {
    id: string
    message: string 
    read: boolean
    senderId: string
    createdAt: Timestamp
}

export const mapFirebaseMessageToMessage = (fMessage: FirebaseMessageDTO, user: User): Message => {
    return {
        createdAt: fMessage.createdAt.toDate(), 
        id: fMessage.id, 
        message: fMessage.message, 
        read: fMessage.read, 
        sender: user
    }
}