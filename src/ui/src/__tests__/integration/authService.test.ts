import { DatabaseRepository } from "@domain/repositories"
import { HttpRepositoryImp } from "@infrastructure/repositories/httpRepository"
import { AuthService } from "@domain/services"
import * as gitMock from "../mocks/http/github"
import { GITHUB_URL } from "@ui/src/constants"

class FirebaseDatabaseRepositoryStub implements DatabaseRepository {
    getOneById<T>(id: string): Promise<T> {
        return Promise.resolve({} as T)
    }
    update(data: any, id: string): Promise<void> {
        return Promise.resolve()
    }
    delete(id: string): Promise<void> {
        return Promise.resolve()
    }
    getAll<T>(): Promise<T[]> {
        return Promise.resolve([] as T[])
    }
    async createOrReplace(data: any, key?: string | undefined): Promise<void> {
        return Promise.resolve()
    }
}

describe('authService', () => {

    beforeAll(() => {
        gitMock.mockAuthTokenRequest()
        gitMock.mockReposRequest()
        gitMock.mockUserRequest()
    })

    it("should return a user", async () => {
        const gitApiHttp = new HttpRepositoryImp(GITHUB_URL.API_BASE_URL)
        const gitAuthHttp = new HttpRepositoryImp(GITHUB_URL.AUTH_BASE_URL)
        const userDbRepository = new FirebaseDatabaseRepositoryStub()
        const authService = new AuthService(gitAuthHttp, gitApiHttp, userDbRepository)

        const credentials = {
            code: "any_code",
            client_id: "any_client_id",
            client_secret: "any_client_secret"
        }
        const user = await authService.authenticateGithub(credentials)
        expect(user).toEqual({
            email: "email",
            id: "id",
            photoUrl: "url",
            username: "username",
            techs: ["language1"]
        })
    })
})