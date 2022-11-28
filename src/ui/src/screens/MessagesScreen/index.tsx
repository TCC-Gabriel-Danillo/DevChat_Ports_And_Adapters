import { useState, useRef } from "react"
import { View, FlatList, TouchableOpacity, TextInput } from "react-native"
import { useAuth, useMessages } from "@ui/src/hooks"
import { COLORS, ICONS, SCREEN_WIDTH } from "@ui/src/constants"
import { MessageBallon, Loading, Container } from "@ui/src/components"
import { Message } from "@domain/entities/models"
import { parseDate } from "@ui/src/utils"



export function MessageScreen() {
    const { messages, sendMessage, isLoadingMessages } = useMessages()
    const [message, setMessage] = useState("")
    const flatListRef = useRef<FlatList>(null);
    const { user: authUser } = useAuth()


    const onMessageChange = (message: string) => setMessage(message)

    // const handleViawbleChange = useCallback(({ changed }) => {
    // console.log(changed)
    //   }, []);

    const onSendMessage = () => {
        sendMessage(message)
        setMessage("")
    }

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
                            isSender={true}
                            message={message.message}
                        />
                    )
                }}
            />
            <View style={{
                width: SCREEN_WIDTH,
                position: "absolute",
                bottom: 10,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
            }}>
                <TextInput
                    style={{ width: "80%", backgroundColor: COLORS.WHITE, paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20, fontSize: 16 }}
                    placeholder="Escreva uma mensagem"
                    onChangeText={onMessageChange}
                    value={message}
                />
                <TouchableOpacity onPress={onSendMessage} style={{ backgroundColor: COLORS.PRIMARY, marginLeft: 10, padding: 10, borderRadius: 50 }}>
                    <ICONS.SEND size={20} color={COLORS.WHITE} />
                </TouchableOpacity>
            </View>
        </Container>
    )
}