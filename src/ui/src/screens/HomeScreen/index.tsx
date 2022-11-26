import { Container, Text } from '@ui/src/components'
import { TEST_ID } from '@ui/src/constants'
import { useConversation } from '@ui/src/hooks'
import { styles } from './styles'

export function HomeScreen(){
    const { conversations } = useConversation()
    console.log({ conversations })
    return(
        <Container style={styles.container} testID={TEST_ID.HOME}>
            <Text> Suas Conversas </Text>
        </Container>
    )
}