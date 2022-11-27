import { useCallback } from "react"
import { View, FlatList, Text, TouchableOpacity } from "react-native"
import { useMessages } from "@ui/src/hooks"


const arr = [1,2,3,4,5,6]

export function MessageScreen(){
    const { messages, sendMessage } = useMessages()
    const handleViawbleChange = useCallback(({ changed }) => {
        // console.log(changed)
      }, []);

    return <FlatList 
        onViewableItemsChanged={handleViawbleChange}
        viewabilityConfig={{ viewAreaCoveragePercentThreshold: 100 }}
        data={arr}
        renderItem={({item, index}) => {
            return(
                <TouchableOpacity 
                    onPress={() => sendMessage(index.toString())}
                    style={{
                        width: "100%",
                        height: 200, 
                        backgroundColor: "cyan", 
                        marginBottom: 10,
                        justifyContent: "center", 
                        alignItems: "center"
                    }}
                >
                    <Text>{index}</Text>
                </TouchableOpacity>
            )
        }}
    />
}