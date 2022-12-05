import { Conversation } from "@domain/entities/models";
import { ConversationUseCase } from "@domain/entities/usecases";
import { DatabaseRepository, RealtimeDatabaseRepository } from "@domain/repositories"
import { ConversationService } from "@domain/services";
import { mapConversationToFirebaseConversation } from "@infrastructure/dto/firebase";
import { sleep } from "@ui/src/utils";
import { DatabaseRepositoryStub, RealtimeDatabaseRepositoryStub } from "../../mocks/stubs";

type SutTypes = {
    conversationDatabaseRepositoryStub: DatabaseRepository
    conversationRealtimeDatabaseRepositorySub: RealtimeDatabaseRepository
    userDatabaseRepositoryStub: DatabaseRepository
    conversationService: ConversationUseCase
}
const makeSut = (): SutTypes => {
    const conversationDatabaseRepositoryStub = new DatabaseRepositoryStub()
    const conversationRealtimeDatabaseRepositorySub = new RealtimeDatabaseRepositoryStub()
    const userDatabaseRepositoryStub = new DatabaseRepositoryStub()

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
        await sleep(100)
        expect(mockedCallback).toHaveBeenCalled()
    })
})