import { Container, Text } from '@ui/src/components'
import { TEST_ID } from '@ui/src/constants'
import { styles } from './styles'

export function HomeScreen(){
    return(
        <Container style={styles.container} testID={TEST_ID.HOME}>
            <Text> Suas Conversas </Text>
        </Container>
    )
}