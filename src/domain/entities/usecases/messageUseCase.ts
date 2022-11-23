import { Message } from "../models";

type MessageChangeCallback = (messages: Array<Message>) => void

export interface MessageUseCase {
    updateMessage(message: Message): Promise<void>
    getAllMessages(): Promise<Message>
    listenMessages(cb: MessageChangeCallback): void
    unlistenMessages(): void
}