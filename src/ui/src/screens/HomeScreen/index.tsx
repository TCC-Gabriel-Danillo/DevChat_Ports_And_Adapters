import { Container, Button, Loading, AddButton } from '@ui/src/components'
import { MAIN_SCREENS, TEST_ID } from '@ui/src/constants'
import { useConversation, useMainNavigation } from '@ui/src/hooks'
import { styles } from './styles'

export function HomeScreen(){
    const { conversations, isLoadingConversations } = useConversation()
    const navigation = useMainNavigation()
    
    if(isLoadingConversations) return <Loading />
    
    const goToTechScreen = () => {
        navigation.navigate(MAIN_SCREENS.TECH_SCREEN); 
    }
    
    return(
        <Container style={styles.container} testID={TEST_ID.HOME}>
            {
                conversations?.map(conversation => (
                    <Button 
                        key={conversation.id}
                        onPress={() => {
                            navigation.navigate(MAIN_SCREENS.MESSAGE_SCREEN, { 
                                conversationId: conversation.id,
                                participant: conversation.users[0] 
                            })
                    }}>
                        {conversation.id}
                    </Button>
                ))
            }
            <AddButton style={styles.addButton} onPress={goToTechScreen} />
        </Container>
    )
}