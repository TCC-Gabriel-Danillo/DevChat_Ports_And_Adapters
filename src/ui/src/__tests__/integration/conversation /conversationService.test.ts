import { Conversation } from "@domain/entities/models";
import { ConversationUseCase } from "@domain/entities/usecases";
import { DatabaseRepository, QueryOptions, RealtimeDatabaseRepository, VoidCallback } from "@domain/repositories"
import { ConversationService } from "@domain/services";
import { mapConversationToFirebaseConversation } from "@infrastructure/dto/firebase";

class ConversationDatabaseRepositoryStub implements DatabaseRepository {
    getOneById<T>(id: string): Promise<T> {
        return Promise.resolve({} as T)
    }
    getAll<T>(args?: QueryOptions | undefined): Promise<T[]> {
        return Promise.resolve([])
    }
    createOrReplace(data: any, id?: string | undefined): Promise<void> {
        return Promise.resolve()
    }
    update(data: any, id: string): Promise<void> {
        return Promise.resolve()
    }
    delete(id: string): Promise<void> {
        return Promise.resolve()
    }
}

class UserDatabaseRepositoryStub implements DatabaseRepository {
    getOneById<T>(id: string): Promise<T> {
        return Promise.resolve({} as T)
    }
    getAll<T>(args?: QueryOptions | undefined): Promise<T[]> {
        return Promise.resolve([])
    }
    createOrReplace(data: any, id?: string | undefined): Promise<void> {
        return Promise.resolve()
    }
    update(data: any, id: string): Promise<void> {
        return Promise.resolve()
    }
    delete(id: string): Promise<void> {
        return Promise.resolve()
    }
}

class ConversationRealtimeDatabaseRepository implements RealtimeDatabaseRepository {
    watch<T>(cb: VoidCallback<T>, args?: QueryOptions | undefined): void {
        cb([])
    }
    unwatch(): void {
        throw new Error("Method not implemented.");
    }
}

type SutTypes = {
    conversationDatabaseRepositoryStub: DatabaseRepository
    conversationRealtimeDatabaseRepositorySub: RealtimeDatabaseRepository
    userDatabaseRepositoryStub: DatabaseRepository
    conversationService: ConversationUseCase
}
const makeSut = (): SutTypes => {
    const conversationDatabaseRepositoryStub = new ConversationDatabaseRepositoryStub()
    const conversationRealtimeDatabaseRepositorySub = new ConversationRealtimeDatabaseRepository()
    const userDatabaseRepositoryStub = new UserDatabaseRepositoryStub()

    const conversationService = new ConversationService(
        conversationDatabaseRepositoryStub,
        userDatabaseRepositoryStub,
        conversationRealtimeDatabaseRepositorySub
    )
    return {
        conversationService,
        conversationDatabaseRepositoryStub,
        conversationRealtimeDatabaseRepositorySub,
        userDatabaseRepositoryStub
    }
}

const mockedConversation: Conversation = {
    createdAt: new Date(),
    id: "any_id",
    lastSenderId: "any_id",
    tech: "any_tech",
    unreadNumber: 0,
    updatedAt: new Date(),
    users: []
}

describe("conversationService", () => {
    it("should call update with the right parameters", async () => {
        const { conversationService, conversationDatabaseRepositoryStub } = makeSut()
        const spy = jest.spyOn(conversationDatabaseRepositoryStub, "update")
        await conversationService.updateConversationById(mockedConversation)
        expect(spy).toHaveBeenCalledWith(mapConversationToFirebaseConversation(mockedConversation), mockedConversation.id)
    })

    it("should call create with the right parameters", async () => {
        const { conversationService, conversationDatabaseRepositoryStub } = makeSut()
        const spy = jest.spyOn(conversationDatabaseRepositoryStub, "createOrReplace")
        await conversationService.createConversation(mockedConversation)
        expect(spy).toHaveBeenCalledWith(mapConversationToFirebaseConversation(mockedConversation), mockedConversation.id)
    })

    it("should call delete with the right parameters", async () => {
        const { conversationService, conversationDatabaseRepositoryStub } = makeSut()
        const spy = jest.spyOn(conversationDatabaseRepositoryStub, "delete")
        await conversationService.deleteConversation(mockedConversation)
        expect(spy).toHaveBeenCalledWith(mockedConversation.id)
    })

    it("should trigger for callback when listening for conversations", async () => {
        const { conversationService } = makeSut()
        const mockedCallback = jest.fn()
        conversationService.listenConversationsByUserId("any_id", mockedCallback);
        expect(mockedCallback).toHaveBeenCalled()
    })
})