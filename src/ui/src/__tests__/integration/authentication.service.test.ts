import nock from "nock"
import { DatabaseRepository, HttpRepository } from "@domain/repositories"
import { HttpRepositoryImp } from "@infrastructure/repositories"
import { AuthService } from "@domain/services"

class FirebaseDatabaseRepositoryStub implements DatabaseRepository {
    getAll<T>(): Promise<T[]> {
       return Promise.resolve( {} as T[])
    }
    async createOrReplace(data: any, key?: string | undefined): Promise<void> {} 
}

describe('authService', ()=> {
    beforeAll(() => {
        nock('https://api.github.com').get('/user').reply(200, {
            email: "email", 
            id: "id", 
            photoUrl: "url", 
            username: "username", 
        })
        nock('https://api.github.com').get('/user/repos').reply(200, [{ language: "language1" }])
        nock('https://github.com/login/oauth').post('/access_token').reply(200, { access_token: "token" })
    })
    it("should return a user", async () => {
        const gitApiHttp = new HttpRepositoryImp("https://api.github.com")
        const gitAuthHttp = new HttpRepositoryImp("https://github.com/login/oauth")
        const userDbRepository = new FirebaseDatabaseRepositoryStub()
        const authService = new AuthService(gitAuthHttp, gitApiHttp, userDbRepository)
        
        const credentials = {
            code: "any_code", 
            client_id: "any_client_id", 
            client_secret: "any_client_secret"
        }
        const user = await authService.authenticateGithub(credentials)
        expect(user).toBe({
            email: "email", 
            id: "id", 
            photoUrl: "url", 
            username: "username", 
            techs: ["language1"]
        })
    })
})