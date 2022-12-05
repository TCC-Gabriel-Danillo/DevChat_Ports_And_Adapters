import { User } from "@domain/entities/models";
import { UsersUseCase } from "@domain/entities/usecases";
import { mockedLoggedUser, mockedParticipant } from "../models";

export class UserServiceStub implements UsersUseCase {
    async listUsersByTech(tech: string): Promise<User[]> {
        return Promise.resolve([mockedLoggedUser, mockedParticipant])
    }
}