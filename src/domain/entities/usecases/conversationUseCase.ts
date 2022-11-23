import { Conversation } from "../models";

type ConversationChangeCallback = (conversations: Array<Conversation>) => void

export interface ConversationUseCase {
    deleteConversation(conversation: Conversation): Promise<void>
    getConversationsByUserId(userId: string): Promise<Array<Conversation>>
    listenConversation(cb: ConversationChangeCallback): void
    unlistenConversation(): void
}