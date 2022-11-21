import { Message } from "./message"

export interface Conversation {
    users: Array<string>    
    lastMessage: Message
    unreadNumber: number
}