import { User } from "./user"

export interface Conversation {
    id: string
    users: Array<User>    
    lastMessage: string
    unreadNumber: number
}