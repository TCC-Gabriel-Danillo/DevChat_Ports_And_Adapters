import { COLORS, ICONS } from "@ui/src/constants"
import { useState } from "react"
import { View, TextInput, TouchableOpacity } from "react-native"
import styles from "./styles"

interface Props {
    onSendMessage: (message: string) => Promise<void>
}

export function MessageInput({ onSendMessage }: Props) {
    const [message, setMessage] = useState("")

    const onMessageChange = (message: string) => setMessage(message)
    const onSend = () => {
        onSendMessage(message)
        setMessage("")
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Escreva uma mensagem"
                onChangeText={onMessageChange}
                value={message}
            />
            <TouchableOpacity onPress={onSend} style={styles.sendButton}>
                <ICONS.SEND size={20} color={COLORS.WHITE} />
            </TouchableOpacity>
        </View>
    )
}