import { User } from '@domain/entities/models'
import { createContext, useCallback, useState } from 'react'
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import { 
    GIT_CLIENT_ID, 
    GIT_CLIENT_SECRET, 
    GIT_REVOCATION_ENDPOINT, 
    GIT_TOKEN_ENDPOINT, 
    GIT_AUTHORIZATION_ENDPOINT, 
    APP_SCHEME,
    STORAGE_KEYS
} from '../constants';
import  { AuthUseCase } from "@domain/entities/usecases"
import { alert } from "@ui/src/helpers"
import { LocalStorageRepository } from '@domain/repositories';
import { usePersistentState } from '@ui/src/hooks/usePersistentState';

WebBrowser.maybeCompleteAuthSession();

const discovery = {
    authorizationEndpoint: GIT_AUTHORIZATION_ENDPOINT,
    tokenEndpoint: GIT_TOKEN_ENDPOINT,
    revocationEndpoint: GIT_REVOCATION_ENDPOINT,
  };

interface Props {
    children: JSX.Element
    authService:  AuthUseCase 
    localStorageRepository: LocalStorageRepository
}

interface AuthInfo {
    loginWithGithub: () => Promise<void>
    logout: () => void
    user?: User
    isAuthenticated: boolean
    isAuthenticating: boolean
}

export const AuthContext = createContext<AuthInfo>({} as AuthInfo)

export function AuthContextProvider({ children, authService, localStorageRepository }: Props){
    const [ user, setUser, isCheckingState ] = usePersistentState<User>(STORAGE_KEYS.USERS, {} as User, localStorageRepository)
    const [ isAuthenticating, setAuthenticating ] = useState<boolean>(false)
    const [,, promptAsync] = useAuthRequest(
        {
          clientId: GIT_CLIENT_ID,
          scopes: ['identity'],
          redirectUri: makeRedirectUri({
            scheme: APP_SCHEME
          }),
        },
        discovery
    );
    
    const loginWithGithub = useCallback(async () => {
        try {
            setAuthenticating(true)
            const promptResponse  = await promptAsync();
            if(promptResponse.type !== 'success') throw new Error("Algo deu errado ao tentar logar.")

            const { code } = promptResponse.params
            const credentials = { 
                client_id: GIT_CLIENT_ID, 
                client_secret: GIT_CLIENT_SECRET,  
                code 
            }
            const userResponse = await authService.authenticateGithub(credentials)
            if(!userResponse) throw new Error("Algo deu errado ao tentar logar.")
            await setUser(userResponse)
            
        } catch(error) {
            console.error(error)
            alert("Error to login with Git.")
        } finally {
            setAuthenticating(false)
        }
    },[promptAsync])

    const logout = () => {
        setUser({} as User)
    }

    return (
        <AuthContext.Provider value={{ 
            loginWithGithub, 
            logout,
            user, 
            isAuthenticating: isAuthenticating || isCheckingState,
            isAuthenticated: !!user.id }}>
            {children}
        </AuthContext.Provider>
    )
}