import { Conversation } from "../models";

export type ConversationCallback = (conversations: Conversation[]) => void

export interface ConversationUseCase {
    deleteConversation(conversation: Conversation): Promise<void>
    getConversationsByUserId(userId: string): Promise<Conversation[]>
    listenConversationsByUserId(userId: string, cb: ConversationCallback): void
    unlistenConversationsByUserId(): void
}