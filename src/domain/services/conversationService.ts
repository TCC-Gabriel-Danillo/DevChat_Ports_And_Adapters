import { ConversationUseCase } from "../../domain/entities/usecases"
import { Conversation, User } from "../entities/models";
import { 
    DatabaseRepository, 
    OP, 
    ORDER, 
    RealtimeDatabaseRepository, 
    VoidCallback
} from "../../domain/repositories"

import { 
    FirebaseConversationDTO, 
    FirebaseUserDto, 
    mapFirebaseToUser, 
    mapFirebaseConversationToConversation 
} from "../../infrastructure/dto/firebase";

export class ConversationService implements ConversationUseCase {
    constructor(
        private readonly conversationDatabaseRepository: DatabaseRepository, 
        private readonly userDatabaseRepository: DatabaseRepository,
        private readonly conversationRealtimeDatabaseRepository: RealtimeDatabaseRepository
    ){}

    deleteConversation(conversation: Conversation): Promise<void> {
        throw new Error("Method not implemented.");
    }

    listenConversationsByUserId(userId: string, cb: VoidCallback<Conversation>): void {
        const filterArgs = {
            field: 'users', 
            op: OP.CONTAINS,
            value: userId 
        }

        const orderArgs = {
            field: "updatedAt", 
            order: ORDER.DESC
        }

        const args = { filterArgs, orderArgs }

        this.conversationRealtimeDatabaseRepository.watch<FirebaseConversationDTO>(async (fConversations) => {
            const conversations = await Promise.all(fConversations.map((fconversation) => this.parseConversation(fconversation)))
            cb(conversations)
        }, args)

    }
    
    unlistenConversationsByUserId(): void {
        this.conversationRealtimeDatabaseRepository.unwatch()
    }

    private async parseConversation(fconversation: FirebaseConversationDTO): Promise<Conversation> {
        const users = await this.getUsersFromConversation(fconversation.users); 
        return mapFirebaseConversationToConversation(fconversation, users); 
    }

    private async getUsersFromConversation(userIds: Array<string>): Promise<Array<User>> {
        const filterArgs = {
            field: 'id', 
            op: OP.IN,
            value: userIds
        }
        const args = { filterArgs }
        const firebaseUsers = await this.userDatabaseRepository.getAll<FirebaseUserDto>(args); 
        return firebaseUsers.map(fUser => mapFirebaseToUser(fUser)); 
    }
    
}