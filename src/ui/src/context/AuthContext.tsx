import { User } from '@domain/entities/models'
import { createContext, useCallback } from 'react'
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import { GIT_CLIENT_ID, GIT_CLIENT_SECRET } from '../constants';

WebBrowser.maybeCompleteAuthSession();

const discovery = {
    authorizationEndpoint: 'https://github.com/login/oauth/authorize',
    tokenEndpoint: 'https://github.com/login/oauth/access_token',
    revocationEndpoint: `https://github.com/settings/connections/applications/${GIT_CLIENT_ID}`,
  };

  
interface Props {
    children: JSX.Element
}

interface AuthInfo {
    loginWithGithub: () => Promise<void>
    user: User
}

export const AuthContext = createContext<AuthInfo>({} as AuthInfo)

export function AuthContextProvider({ children }: Props){
    const [,, promptAsync] = useAuthRequest(
        {
          clientId: GIT_CLIENT_ID,
          scopes: ['identity'],
          redirectUri: makeRedirectUri({
            scheme: 'devchat.app'
          }),
        },
        discovery
    );
    
    const loginWithGithub = useCallback(async () => {
        const promptResponse  = await promptAsync();

        if(promptResponse.type !== 'success') return 

        const { code } = promptResponse.params
        const response = await fetch('https://github.com/login/oauth/access_token', {
            method: 'POST',
            body: JSON.stringify({ 
                client_id: GIT_CLIENT_ID, 
                client_secret: GIT_CLIENT_SECRET,  
                code 
            }), 
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        
        if(!response.ok) return

        const json  = await response.json()
        const { access_token } = json
        const userResponse = await fetch('https://api.github.com/user', {
            headers: {
                authorization: `Bearer ${access_token}`
            }
        })

        if(!userResponse.ok) return 
            
        const userJson = await userResponse.json()
        console.log("🚀 ~ file: AuthContext.tsx ~ line 66 ~ loginWithGithub ~ userJson", userJson)   
        

    },[promptAsync])

    return (
        <AuthContext.Provider value={{loginWithGithub, user: {} as User}}>
            {children}
        </AuthContext.Provider>
    )
}