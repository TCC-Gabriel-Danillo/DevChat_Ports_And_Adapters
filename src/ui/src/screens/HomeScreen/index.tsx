import { Container, Button } from '@ui/src/components'
import { MAIN_SCREENS, TEST_ID } from '@ui/src/constants'
import { useConversation } from '@ui/src/hooks'
import { styles } from './styles'
import { useNavigation, NavigationProp } from "@react-navigation/native"
import { NavOpts } from '@ui/src/navigation/main'

export function HomeScreen(){
    const { conversations } = useConversation()
    const navigation = useNavigation<NavigationProp<NavOpts>>()
    
    return(
        <Container style={styles.container} testID={TEST_ID.HOME}>
            {
                conversations?.map(conversation => (
                    <Button 
                        key={conversation.id}
                        onPress={() => {
                            navigation.navigate(MAIN_SCREENS.CONVERSATION_SCREEN, { 
                                conversationId: conversation.id,
                                users: conversation.users 
                            })
                    }}>
                        {conversation.id}
                    </Button>
                ))
            }
      
        </Container>
    )
}