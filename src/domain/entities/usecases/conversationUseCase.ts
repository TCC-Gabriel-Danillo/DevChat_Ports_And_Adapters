import { VoidCallback } from "@domain/repositories";
import { Conversation } from "../models";


export interface ConversationUseCase {
    deleteConversation(conversation: Conversation): Promise<void>
    listenConversationsByUserId(userId: string, cb: VoidCallback<Conversation>): void
    unlistenConversationsByUserId(): void
}