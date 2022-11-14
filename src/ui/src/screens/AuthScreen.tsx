import { TouchableOpacity, Text } from 'react-native'
import { useAuth } from '../hooks'

export function AuthScreen(){
    const { loginWithGithub } = useAuth()
    return(
        <TouchableOpacity  
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}} 
            onPress={loginWithGithub}
        >
            <Text>Login</Text>
        </TouchableOpacity>
    )
}