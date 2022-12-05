import { Message, User } from "@domain/entities/models";
import { MessageUseCase } from "@domain/entities/usecases";
import { DatabaseRepository, QueryOptions, RealtimeDatabaseRepository, VoidCallback } from "@domain/repositories"
import { MessageService } from "@domain/services";
import { mapMessageToFirebaseMessage } from "@infrastructure/dto/firebase";
import { sleep } from "@ui/src/utils";

class MessageDatabaseRepositoryStub implements DatabaseRepository {
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

class MessageRealtimeDatabaseRepository implements RealtimeDatabaseRepository {
    watch<T>(cb: VoidCallback<T>, args?: QueryOptions | undefined): void {
        cb([])
    }
    unwatch(): void {
        throw new Error("Method not implemented.");
    }
}

type SutTypes = {
    messageDatabaseRepositoryStub: DatabaseRepository
    messageRealtimeDatabaseRepositorySub: RealtimeDatabaseRepository
    userDatabaseRepositoryStub: DatabaseRepository
    messageService: MessageUseCase
}
const makeSut = (): SutTypes => {
    const messageDatabaseRepositoryStub = new MessageDatabaseRepositoryStub()
    const messageRealtimeDatabaseRepositorySub = new MessageRealtimeDatabaseRepository()
    const userDatabaseRepositoryStub = new UserDatabaseRepositoryStub()

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