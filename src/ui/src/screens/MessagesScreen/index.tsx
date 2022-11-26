import { View } from "react-native"
import { useMessages } from "@ui/src/hooks"

export function MessageScreen(){
    const { messages } = useMessages()
    console.log({ messages })
    return <View />
}