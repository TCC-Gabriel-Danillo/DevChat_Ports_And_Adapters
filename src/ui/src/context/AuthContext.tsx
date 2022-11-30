import { User } from '@domain/entities/models'
import { createContext, useCallback, useState } from 'react'
import { STORAGE_KEYS } from '../constants';
import { AuthUseCase } from "@domain/entities/usecases"
import { LocalStorageRepository } from '@domain/repositories';
import { usePersistentState } from '@ui/src/hooks/usePersistentState';
import { AuthPromptService, useAlert } from '../hooks';

interface Props {
    children: JSX.Element
    authPromptService: AuthPromptService
    authService: AuthUseCase
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

export function AuthContextProvider({
    children,
    authService,
    localStorageRepository,
    authPromptService
}: Props) {

    const [user, setUser, isCheckingState] = usePersistentState<User>(STORAGE_KEYS.USERS, {} as User, localStorageRepository)
    const [isAuthenticating, setAuthenticating] = useState<boolean>(false)
    const { promptAuth } = authPromptService
    const { openAlert } = useAlert()

    const loginWithGithub = useCallback(async () => {
        try {
            setAuthenticating(true)
            const credentials = await promptAuth();
            const userResponse = await authService.authenticateGithub(credentials)
            if (!userResponse) throw new Error("Algo deu errado ao tentar logar.")
            await setUser(userResponse)

        } catch (error) {
            console.error(error)
            openAlert({ message: "Erro ao logar com o git." })
        } finally {
            setAuthenticating(false)
        }
    }, [promptAuth])

    const logout = () => {
        setUser({} as User)
    }

    return (
        <AuthContext.Provider value={{
            loginWithGithub,
            logout,
            user,
            isAuthenticating: isAuthenticating || isCheckingState,
            isAuthenticated: !!user.id
        }}>
            {children}
        </AuthContext.Provider>
    )
}