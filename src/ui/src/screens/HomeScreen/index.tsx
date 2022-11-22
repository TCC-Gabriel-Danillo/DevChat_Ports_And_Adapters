import { Container, Button } from '@ui/src/components'
import { useAuth } from '@ui/src/hooks'
import { styles } from './styles'

export function HomeScreen(){
    const { logout } = useAuth()
    return(
        <Container style={styles.container} testID="home_screen">
            <Button onPress={logout}>Logout</Button>
        </Container>
    )
}