import { createContext, useState, useEffect } from "react"
import { Message } from "@domain/entities/models"
import { MessageUseCase } from "@domain/entities/usecases"

interface Props {
    children: JSX.Element
    messageService: MessageUseCase
}


interface MessageContextData {
    messages: Message[]
    isLoadingMessages: boolean 
}


export const MessageContext = createContext<MessageContextData>({} as MessageContextData)

export function MessageContextProvider({ children, messageService }: Props){
    const [messages, setMessages] = useState<Message[]>([])
    const [isLoadingMessages, setLoadingMessages] = useState(true)

    useEffect(() => {
        messageService.listenMessages(onMessagesChanged)
        return () => messageService.unlistenMessages()
    },[])

    const onMessagesChanged = (newMessages: Message[]) => {
        setLoadingMessages(false)
        setMessages(newMessages); 
    }

    return(
        <MessageContext.Provider value={{messages, isLoadingMessages}}>
            {children}
        </MessageContext.Provider>
    )

}