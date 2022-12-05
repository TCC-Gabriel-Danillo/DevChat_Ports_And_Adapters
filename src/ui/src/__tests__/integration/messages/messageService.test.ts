import { Message, User } from "@domain/entities/models";
import { MessageUseCase } from "@domain/entities/usecases";
import { DatabaseRepository, RealtimeDatabaseRepository } from "@domain/repositories"
import { MessageService } from "@domain/services";
import { mapMessageToFirebaseMessage } from "@infrastructure/dto/firebase";
import { sleep } from "@ui/src/utils";
import { DatabaseRepositoryStub, RealtimeDatabaseRepositoryStub } from "../../mocks/stubs";


type SutTypes = {
    messageDatabaseRepositoryStub: DatabaseRepository
    messageRealtimeDatabaseRepositorySub: RealtimeDatabaseRepository
    userDatabaseRepositoryStub: DatabaseRepository
    messageService: MessageUseCase
}
const makeSut = (): SutTypes => {
    const messageDatabaseRepositoryStub = new DatabaseRepositoryStub()
    const messageRealtimeDatabaseRepositorySub = new RealtimeDatabaseRepositoryStub()
    const userDatabaseRepositoryStub = new DatabaseRepositoryStub()

    const messageService = new MessageService(
        messageDatabaseRepositoryStub,
        messageRealtimeDatabaseRepositorySub,
        userDatabaseRepositoryStub,
    )
    return {
        messageService,
        messageDatabaseRepositoryStub,
        messageRealtimeDatabaseRepositorySub,
        userDatabaseRepositoryStub
    }
}

const mockedMessage: Message = {
    createdAt: new Date(),
    id: "any_id",
    message: "any_message",
    read: false,
    sender: { id: "any_id" } as User
}

describe("messageService", () => {
    it("should call update with the right parameters", async () => {
        const { messageService, messageDatabaseRepositoryStub } = makeSut()
        const spy = jest.spyOn(messageDatabaseRepositoryStub, "update")
        await messageService.updateMessage(mockedMessage)
        expect(spy).toHaveBeenCalledWith(mapMessageToFirebaseMessage(mockedMessage), mockedMessage.id)
    })

    it("should call create with the right parameters", async () => {
        const { messageService, messageDatabaseRepositoryStub } = makeSut()
        const spy = jest.spyOn(messageDatabaseRepositoryStub, "createOrReplace")
        await messageService.sendMessage(mockedMessage)
        expect(spy).toHaveBeenCalledWith(mapMessageToFirebaseMessage(mockedMessage), mockedMessage.id)
    })

    it("should trigger for callback when listening for messages", async () => {
        const { messageService } = makeSut()
        const mockedCallback = jest.fn()
        messageService.listenMessages(mockedCallback);
        await sleep(100)
        expect(mockedCallback).toHaveBeenCalled()
    })
})