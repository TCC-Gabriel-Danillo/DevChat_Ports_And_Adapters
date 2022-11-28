import { User } from "./user"

export interface Conversation {
    id: string
    users: Array<User>    
    unreadNumber: number
    createdAt: Date
    updatedAt: Date
    tech: string
}