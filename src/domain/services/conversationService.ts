import { ConversationUseCase } from "../../domain/entities/usecases"
import { Conversation, User } from "../entities/models";
import { DatabaseRepository, OP, RealtimeDatabaseRepository } from "../../domain/repositories"
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
        const args = {
            field: 'users', 
            op: OP.CONTAINS,
            value: userId 
        }
        const conversations = await this.conversationDatabaseRepository.getAll<FirebaseConversationDTO>(args); 
        return Promise.all(conversations.map(fConversation => this.parseConversation(fConversation)))
    }

    listenConversation(cb: (conversations: Conversation[]) => void): void {
        throw new Error("Method not implemented.");
    }
    
    unlistenConversation(): void {
        throw new Error("Method not implemented.");
    }

    private async parseConversation(conversation: FirebaseConversationDTO): Promise<Conversation> {
        const users = await this.getUsersFromConversation(conversation.users); 
        return mapFirebaseConversationToConversation(conversation, users); 
    }

    private async getUsersFromConversation(userIds: Array<string>): Promise<Array<User>> {
        const args = {
            field: 'id', 
            op: OP.IN,
            value: userIds
        }
        const firebaseUsers = await this.userDatabaseRepository.getAll<FirebaseUserDto>(args); 
        return firebaseUsers.map(fUser => mapFirebaseToUser(fUser)); 
    }
    
}