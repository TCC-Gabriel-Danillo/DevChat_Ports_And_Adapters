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
    APP_SCHEME
} from '../constants';
import  { AuthUseCase } from "@domain/entities/usecases"
import { alert } from "@ui/src/helpers"

WebBrowser.maybeCompleteAuthSession();

const discovery = {
    authorizationEndpoint: GIT_AUTHORIZATION_ENDPOINT,
    tokenEndpoint: GIT_TOKEN_ENDPOINT,
    revocationEndpoint: GIT_REVOCATION_ENDPOINT,
  };

interface Props {
    children: JSX.Element
    authService:  AuthUseCase 
}

interface AuthInfo {
    loginWithGithub: () => Promise<void>
    user?: User
    isAuthenticated: boolean
    isAuthenticating: boolean
}

export const AuthContext = createContext<AuthInfo>({} as AuthInfo)

export function AuthContextProvider({ children, authService }: Props){
    const [ user, setUser ] = useState<User>()
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
            if(promptResponse.type !== 'success') throw new Error("Something went wrong")

            const { code } = promptResponse.params
            const credentials = { 
                client_id: GIT_CLIENT_ID, 
                client_secret: GIT_CLIENT_SECRET,  
                code 
            }
            const userResponse = await authService.authenticateGithub(credentials)
            setUser(userResponse)
        } catch(error) {
            console.error(error)
            alert("Error to login with Git.")
        } finally {
            setAuthenticating(false)
        }
    },[promptAsync])

    return (
        <AuthContext.Provider value={{ loginWithGithub, user, isAuthenticating ,isAuthenticated: !!user }}>
            {children}
        </AuthContext.Provider>
    )
}