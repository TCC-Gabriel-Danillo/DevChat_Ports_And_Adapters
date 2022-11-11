import { TouchableOpacity, Text } from 'react-native'
import { useAuth } from '../hooks'

export function AuthPage(){
    const { loginWithGithub } = useAuth()
    return(
        <TouchableOpacity onPress={loginWithGithub}>
            <Text>Login</Text>
        </TouchableOpacity>
    )
}