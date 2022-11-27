import { AuthContextProvider } from '@ui/src/context';
import { FirebaseDatabaseRepository, HttpRepositoryImp, LocalStorage } from "@infrastructure/repositories"
import {  AuthService } from "@domain/services"
import { FIREBASE_COLLECTION, GITHUB_URL } from "@ui/src/constants";
import { useAuthPrompt } from "@ui/src/hooks";
interface Props {
    children: JSX.Element
}


export function AuthProviderComposer({ children }: Props){
    const authPromptService = useAuthPrompt()
    const gitAuthHttp = new HttpRepositoryImp(GITHUB_URL.AUTH_BASE_URL)
    const gitApiHttp = new HttpRepositoryImp(GITHUB_URL.API_BASE_URL)
    const userDbRepository = new FirebaseDatabaseRepository(FIREBASE_COLLECTION.USERS)
    const authService = new AuthService(gitAuthHttp, gitApiHttp, userDbRepository)
    const localStorageRepository = new LocalStorage()

    return(
      <AuthContextProvider 
        authPromptService={authPromptService}
        authService={authService}
        localStorageRepository={localStorageRepository}
      >
        {children}
      </AuthContextProvider>
    )
}