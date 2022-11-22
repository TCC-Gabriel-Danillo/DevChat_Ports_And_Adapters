import { DatabaseRepository } from "@domain/repositories"
import { HttpRepositoryImp } from "@infrastructure/repositories/httpRepository"
import { AuthService } from "@domain/services"
import * as gitMock from "../mocks/http/github"
import { GITHUB_URL } from "@ui/src/constants"

class FirebaseDatabaseRepositoryStub implements DatabaseRepository {
    getAll<T>(): Promise<T[]> {
       return Promise.resolve( {} as T[])
    }
    async createOrReplace(data: any, key?: string | undefined): Promise<void> {} 
}

describe('authService', ()=> {

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