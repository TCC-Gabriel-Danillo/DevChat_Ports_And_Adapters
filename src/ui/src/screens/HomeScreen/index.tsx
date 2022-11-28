import { FlatList, TouchableOpacity, View } from "react-native"
import { Container, Text, Loading, AddButton, UserCard, Badge } from '@ui/src/components'
import { COLORS, ICONS, MAIN_SCREENS, TEST_ID } from '@ui/src/constants'
import { useAuth, useConversation, useMainNavigation } from '@ui/src/hooks'
import { styles } from './styles'
import { Conversation, User } from "@domain/entities/models"

export function HomeScreen() {
    const { conversations, isLoadingConversations } = useConversation()
    const navigation = useMainNavigation()
    const { user: authUser } = useAuth()

    if (isLoadingConversations) return <Loading />

    const goToTechScreen = () => {
        navigation.navigate(MAIN_SCREENS.TECH_SCREEN);
    }

    const goToMessageScreen = (conversation: Conversation, participant: User) => {
        navigation.navigate(MAIN_SCREENS.MESSAGE_SCREEN, {
            conversation,
            participant
        })
    }

    return (
        <Container testID={TEST_ID.HOME}>
            <Text fontType="h2">Suas conversas iniciadas para cada tecnologia de interesse:</Text>
            <FlatList
                data={conversations}
                renderItem={({ item: conversation }) => {

                    const participant = conversation.users.filter(cUser => cUser.id !== authUser?.id)[0]
                    const shouldShowBadge = conversation.unreadNumber > 0 && conversation.lastSenderId !== authUser?.id

                    return (
                        <TouchableOpacity
                            onPress={() => goToMessageScreen(conversation, participant)}
                            style={styles.userCard}
                        >
                            <UserCard
                                photoUrl={participant.photoUrl}
                                title={participant.username}
                                subtile={`Tema: ${conversation.tech}`}
                            />

                            {shouldShowBadge && <Badge
                                text={conversation.unreadNumber}
                                style={styles.unreadNumber}
                            />}
                            <ICONS.CARRET_RIGHT color={COLORS.GREY} />
                        </TouchableOpacity>
                    )
                }}
            />
            <AddButton style={styles.addButton} onPress={goToTechScreen} />
        </Container>
    )
}