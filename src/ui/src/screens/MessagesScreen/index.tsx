import { useRef } from "react"
import { FlatList } from "react-native"
import { useAuth, useMessages } from "@ui/src/hooks"
import { MessageBallon, Loading, Container, MessageInput } from "@ui/src/components"
import { Message } from "@domain/entities/models"
import { parseDate } from "@ui/src/utils"



export function MessageScreen() {
    const { messages, sendMessage, isLoadingMessages } = useMessages()
    const flatListRef = useRef<FlatList>(null);
    const { user: authUser } = useAuth()

    // const handleViawbleChange = useCallback(({ changed }) => {
    // console.log(changed)
    //   }, []);



    if (isLoadingMessages) return <Loading />
    return (
        <Container
            style={{ flex: 1, height: "100%" }}
        >
            <FlatList<Message>
                inverted
                ref={flatListRef}
                style={{ marginBottom: 50 }}
                // onViewableItemsChanged={handleViawbleChange}
                viewabilityConfig={{ viewAreaCoveragePercentThreshold: 100 }}
                data={messages}
                contentContainerStyle={{ flexDirection: 'column-reverse' }}
                renderItem={({ item: message, index }) => {
                    return (
                        <MessageBallon
                            formatedDate={parseDate(message.createdAt)}
                            isRead={message.read}
                            isSender={message.sender.id === authUser?.id}
                            message={message.message}
                        />
                    )
                }}
            />
            <MessageInput
                onSendMessage={sendMessage}
            />
        </Container>
    )
}