import { Image } from 'react-native'
import { Container, Text } from "@ui/src/components"
import loadingImg from "@ui/assets/loading.png"

import { styles } from './styles'

export function LoadingScreen(){
    return (
        <Container style={styles.container}>
            <Image source={loadingImg} style={styles.loadingImg} />
            <Text fontType="h2">Carregando...</Text>
        </Container>
    )
}