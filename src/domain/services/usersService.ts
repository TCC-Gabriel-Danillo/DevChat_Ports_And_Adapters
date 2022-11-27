import { User } from "../entities/models";
import { UsersUseCase } from "../entities/usecases/usersUseCase";
import { DatabaseRepository, OP } from "../repositories";
import { FirebaseUserDto, mapFirebaseToUser } from "../../infrastructure/dto/firebase"

export class UserService implements UsersUseCase {

    constructor(private readonly userDatabaseRepository: DatabaseRepository){}

    async listUsersByTech(tech: string): Promise<User[]> {
        const filterArgs = {
            field: "techs", 
            op: OP.CONTAINS, 
            value: tech
        }
        const fUsers  = await this.userDatabaseRepository.getAll<FirebaseUserDto>({ filterArgs })
        return fUsers.map(fUser => mapFirebaseToUser(fUser)); 
    }
}