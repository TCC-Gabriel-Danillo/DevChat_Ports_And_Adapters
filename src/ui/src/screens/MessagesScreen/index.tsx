import { useCallback } from "react"
import { View, FlatList, Text, TouchableOpacity } from "react-native"
import { useMessages } from "@ui/src/hooks"



export function MessageScreen(){
    const { messages, sendMessage } = useMessages()
    // const handleViawbleChange = useCallback(({ changed }) => {
        // console.log(changed)
    //   }, []);

    return <FlatList 
        inverted
        // onViewableItemsChanged={handleViawbleChange}
        viewabilityConfig={{ viewAreaCoveragePercentThreshold: 100 }}
        data={messages}
        renderItem={({item: message, index}) => {
            return(
                <TouchableOpacity 
                    onPress={() => sendMessage(index.toString())}
                    style={{
                        width: "100%",
                        height: 30, 
                        backgroundColor: "cyan", 
                        marginBottom: 10,
                        justifyContent: "center", 
                        alignItems: "center"
                    }}
                >
                    <Text>{message.message}</Text>
                </TouchableOpacity>
            )
        }}
    />
}