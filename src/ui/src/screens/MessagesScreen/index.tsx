import { memo, useCallback, useState, RefObject, useRef, useEffect, useMemo } from "react"
import { View, FlatList, Text, TouchableOpacity, TextInput } from "react-native"
import { useAuth, useMessages } from "@ui/src/hooks"
import { COLORS, ICONS, SCREEN_WIDTH } from "@ui/src/constants"
import { Button, Loading } from "@ui/src/components"
import { Message } from "@domain/entities/models"



export function MessageScreen(){
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
    
    if(isLoadingMessages) return <Loading />
    return (
        <View
            style={{ flex: 1, height: "100%" }}
        >
            <FlatList 
                inverted
                ref={flatListRef}
                style={{ marginBottom: 50 }}
                // onViewableItemsChanged={handleViawbleChange}
                viewabilityConfig={{ viewAreaCoveragePercentThreshold: 100 }}
                data={messages}
                contentContainerStyle={{ flexDirection: 'column-reverse' }}
                renderItem={({item: message, index}) => {
                    return(
                        <View
                            style={{
                                width: "100%",
                                alignItems: message.sender.id === authUser?.id ?  "flex-end" : "flex-start",
                            }}
                        >
                            <View 
                                key={message.id}
                                style={{
                                    width: "80%",
                                    height: 60, 
                                    backgroundColor: "cyan", 
                                    marginBottom: 10,
                                    justifyContent: "center", 
                                    alignItems: "center", 
                                    borderRadius: 15
                                }}
                                >
                                <Text>{message.message}</Text>
                            </View>
                        </View>
                    )
                }}
            />
            <View style={{
                width: "100%", 
                position: "absolute",
                bottom: 10, 
                flexDirection: "row", 
                alignItems: "center", 
                justifyContent: "center", 
            }}>
                <TextInput 
                    style={{width: "80%", backgroundColor: COLORS.WHITE, paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20, fontSize: 16 }}
                    placeholder="Escreva uma mensagem"
                    onChangeText={onMessageChange}
                    value={message}
                />
                <TouchableOpacity onPress={onSendMessage} style={{backgroundColor: COLORS.PRIMARY, marginLeft: 10, padding: 10, borderRadius: 50}}>
                    <ICONS.SEND size={20} color={COLORS.WHITE} />
                </TouchableOpacity>
            </View>
        </View>
    )
}