import { Image } from 'react-native'
import { useAuth } from '@ui/src/hooks'
import { AntDesign } from '@expo/vector-icons';
import { Button, Container, Text } from "@ui/src/components"
import chatImg from '@ui/assets/chat.png'
import { styles } from './styles';
import { TEST_ID, WHITE } from '@ui/src/constants';

export function AuthScreen(){
    const { loginWithGithub } = useAuth()
    return(
        <Container style={styles.container} testID={TEST_ID.AUTH}>
            <Text fontType='h1' fontWeight='bold'>Bem vindo ao DevChat!</Text>
            <Text style={styles.subtitle}>Encontre incríveis desenvolvedores e troque experiências.</Text>
            <Image source={chatImg} style={styles.image}/>
            <Button 
                style={styles.loginBtn}
                onPress={loginWithGithub} 
                icon={<AntDesign name="github" size={24} color={WHITE} />}
            >
                Entrar com Github
            </Button>
        </Container>
    )
}