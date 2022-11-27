import { Container, Button, Text, AddButton } from '@ui/src/components'
import { MAIN_SCREENS, TEST_ID } from '@ui/src/constants'
import { useConversation } from '@ui/src/hooks'
import { styles } from './styles'
import { useNavigation, NavigationProp } from "@react-navigation/native"
import { NavOpts } from '@ui/src/navigation/main'

export function HomeScreen(){
    const { conversations, isLoadingConversations } = useConversation()
    
    const navigation = useNavigation<NavigationProp<NavOpts>>()

    if(isLoadingConversations) return <Text>Carregando...</Text>
    
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