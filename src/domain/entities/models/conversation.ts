import { User } from "./user"

export interface Conversation {
    users: Array<User>    
    lastMessage: string
    unreadNumber: number
}