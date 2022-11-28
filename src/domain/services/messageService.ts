import { Message, User } from "../entities/models";
import { MessageUseCase } from "../entities/usecases"

import {
    DatabaseRepository,
    ORDER,
    RealtimeDatabaseRepository,
    VoidCallback
} from "../repositories"

import {
    FirebaseMessageDTO,
    FirebaseUserDto,
    mapFirebaseMessageToMessage,
    mapMessageToFirebaseMessage,
    mapFirebaseToUser,
} from "../../infrastructure/dto/firebase";

export class MessageService implements MessageUseCase {
    constructor(
        private readonly messageDatabaseRepository: DatabaseRepository,
        private readonly messageRealtimeDatabaseRepository: RealtimeDatabaseRepository,
        private readonly userDatabaseRepository: DatabaseRepository
    ) { }

    async sendMessage(message: Message): Promise<void> {
        const fMessage = mapMessageToFirebaseMessage(message)
        await this.messageDatabaseRepository.createOrReplace(fMessage, fMessage.id)
    }

    async updateMessage(message: Message): Promise<void> {
        const fMessage = mapMessageToFirebaseMessage(message)
        await this.messageDatabaseRepository.update(fMessage, fMessage.id);
    }

    listenMessages(cb: VoidCallback<Message>): void {
        const orderArgs = {
            field: "createdAt",
            order: ORDER.ASC
        }

        const args = { orderArgs }
        this.messageRealtimeDatabaseRepository.watch<FirebaseMessageDTO>(async (fMessages) => {
            const messages = await Promise.all(fMessages.map((fMessage) => this.parseMessage(fMessage)))
            cb(messages)
        }, args)
    }
    unlistenMessages(): void {
        this.messageRealtimeDatabaseRepository.unwatch()
    }

    private async parseMessage(fMessage: FirebaseMessageDTO): Promise<Message> {
        const user = await this.getUserFromMessage(fMessage.senderId);
        return mapFirebaseMessageToMessage(fMessage, user);
    }

    private async getUserFromMessage(userId: string): Promise<User> {
        const fUser = await this.userDatabaseRepository.getOneById<FirebaseUserDto>(userId);
        return mapFirebaseToUser(fUser)
    }

}