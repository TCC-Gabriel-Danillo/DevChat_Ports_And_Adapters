import { Conversation } from "@domain/entities/models"
import { ConversationUseCase } from "@domain/entities/usecases"
import { VoidCallback } from "@domain/repositories"
import { mockedConversation } from "../models"

export class ConversationServiceStub implements ConversationUseCase {
    updateConversationById(conversation: Conversation): Promise<void> {
        return Promise.resolve()
    }
    createConversation(conversation: Conversation): Promise<void> {
        return Promise.resolve()
    }
    deleteConversation(conversation: Conversation): Promise<void> {
        return Promise.resolve()
    }
    listenConversationsByUserId(userId: string, cb: VoidCallback<Conversation>): void {
        cb([mockedConversation])
    }
    unlistenConversationsByUserId(): void {
        return
    }
}