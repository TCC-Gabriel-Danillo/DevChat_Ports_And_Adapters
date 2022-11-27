import { VoidCallback } from "@domain/repositories";
import { Message } from "../models";


export interface MessageUseCase {
    sendMessage(message:Message): Promise<void>
    updateMessage(message: Message): Promise<void>
    listenMessages(cb: VoidCallback<Message>): void
    unlistenMessages(): void
}