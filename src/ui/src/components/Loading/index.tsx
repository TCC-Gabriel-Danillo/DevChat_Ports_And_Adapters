import { Image } from 'react-native'
import { Container } from "@ui/src/components/Container"
import { Text } from "@ui/src/components/Text"
import loadingImg from "@ui/assets/loading.png"

import styles from './styles'

export function Loading(){
    return (
        <Container style={styles.container}>
            <Image source={loadingImg} style={styles.loadingImg} />
            <Text fontType="h2">Carregando...</Text>
        </Container>
    )
}