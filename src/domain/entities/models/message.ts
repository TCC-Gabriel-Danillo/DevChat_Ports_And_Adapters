export interface Message {
    senderId: string 
    createdAt: Date
    message: string
    read: boolean
}