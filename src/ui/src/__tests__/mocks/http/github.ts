import { GITHUB_URL } from "@ui/src/constants"
import nock from "nock"

export const  mockUserRequest = () => {
    nock(GITHUB_URL.API_BASE_URL).get('/user').reply(200, {
        email: "email", 
        id: "id", 
        avatar_url: "url", 
        login: "username", 
    })
}

export const mockReposRequest = () => {
    nock(GITHUB_URL.API_BASE_URL).get('/user/repos').reply(200, [{ language: "language1" }])
}

export const mockAuthTokenRequest = () => {
    nock(GITHUB_URL.AUTH_BASE_URL).post('/access_token').reply(200, { access_token: "token" })
}