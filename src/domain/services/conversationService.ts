import { ConversationUseCase, ConversationCallback } from "../../domain/entities/usecases"
import { Conversation, User } from "../entities/models";
import { DatabaseRepository, OP, ORDER, RealtimeDatabaseRepository,  } from "../../domain/repositories"
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
    async getConversationsByUserId(userId: string): Promise<Conversation[]> {
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
        const conversations = await this.conversationDatabaseRepository.getAll<FirebaseConversationDTO>(args); 
        return Promise.all(conversations.map(fConversation => this.parseConversation(fConversation)))
    }

    listenConversationsByUserId(userId: string, cb:ConversationCallback): void {
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
            const conversations = await Promise.all(fConversations.map(fConversation => this.parseConversation(fConversation)))
            cb(conversations)
        }, args)

    }
    
    unlistenConversationsByUserId(): void {
        this.conversationRealtimeDatabaseRepository.unwatch()
    }

    private async parseConversation(conversation: FirebaseConversationDTO): Promise<Conversation> {
        const users = await this.getUsersFromConversation(conversation.users); 
        return mapFirebaseConversationToConversation(conversation, users); 
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