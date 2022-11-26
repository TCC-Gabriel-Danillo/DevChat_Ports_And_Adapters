import { VoidCallback } from "@domain/repositories";
import { Message } from "../models";


export interface MessageUseCase {
    updateMessage(message: Message): Promise<void>
    listenMessages(cb: VoidCallback<Message>): void
    unlistenMessages(): void
}