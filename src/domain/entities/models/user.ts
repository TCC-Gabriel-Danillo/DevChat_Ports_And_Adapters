export interface User {
    username: string 
    id: string
    photoUrl?: string
    email: string
    techs?: Array<String>
}

export const mapGitUserToUser = (data: any): User => {
    return {
        email: data.email, 
        id: String(data.id), 
        photoUrl: data.avatar_url, 
        techs: data.techs, 
        username: data.login, 
    }
}