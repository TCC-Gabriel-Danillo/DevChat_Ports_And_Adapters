import { GitRepository, GitTokenDto, GitUser } from '../../infrastructure/dto/http';
import { mapGitUserToUser, User } from '../entities/models';
import { AuthUseCase, Credentials } from '../entities/usecases'
import { DatabaseRepository, HttpRepository } from '../repositories';


export class AuthService implements AuthUseCase {
    constructor(
        private readonly gitAuthHttp: HttpRepository, 
        private readonly gitApiHttp: HttpRepository, 
        private readonly userDatabaseRepository: DatabaseRepository
    ){}

    async authenticateGithub (credentials: Credentials): Promise<User | undefined> {
        const tokenResponse = await this.exchangeCredentials(credentials)
        if(!tokenResponse) return

        const { access_token } = tokenResponse

        const [ gitUser, gitRepos ] = await Promise.all([
            this.getUserInfo(access_token),
            this.getUserRepos(access_token)
        ])

        if(!gitUser || !gitRepos) return

        const techs = this.getTechsInfoFromGitRepos(gitRepos)

        const newUser = mapGitUserToUser({...gitUser, techs})
        await this.createUserIfNotExists(newUser)
        return newUser    
    }   

    async exchangeCredentials(credentials: Credentials){
        return this.gitAuthHttp.post<GitTokenDto>('/access_token', credentials, { 
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
    }

    async getUserInfo(token: string): Promise<GitUser | undefined> {
        return this.gitApiHttp.get<GitUser>('/user', {
            headers: { authorization: `Bearer ${token}` } 
        }); 
    }

    async getUserRepos(token: string): Promise<GitRepository[] | undefined>{
        return this.gitApiHttp.get<GitRepository[]>('/user/repos', {
            headers: { authorization: `Bearer ${token}` } 
        }); 
    }

    getTechsInfoFromGitRepos(repos: GitRepository[]): string[] {
        const techs: Array<string> = []
        repos.forEach(repo => {
            const isNewTech = !techs.find((tech) => repo.language == tech)
            if(isNewTech && repo.language){
                techs.push(repo.language)
            }
        })
        return techs
    }

    async createUserIfNotExists(user: User){
        await this.userDatabaseRepository.createOrReplace(user, user.id)
    }
}