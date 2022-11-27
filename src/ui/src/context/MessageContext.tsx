import { createContext, useState, useEffect } from "react"
import { Message } from "@domain/entities/models"
import { MessageUseCase } from "@domain/entities/usecases"
import { useAuth } from "@ui/src/hooks/useAuth"
import { generateRandomId } from '@ui/src/utils/generateRandomId';

interface Props {
    children: JSX.Element
    messageService: MessageUseCase
}


interface MessageContextData {
    messages: Message[]
    isLoadingMessages: boolean 
    sendMessage: (message: string) => Promise<void>
}


export const MessageContext = createContext<MessageContextData>({} as MessageContextData)

export function MessageContextProvider({ children, messageService }: Props){
    const [messages, setMessages] = useState<Message[]>([])
    const [isLoadingMessages, setLoadingMessages] = useState(true)
    const { user } = useAuth()

    useEffect(() => {
        messageService.listenMessages(onMessagesChanged)
        return () => messageService.unlistenMessages()
    },[])

    const sendMessage = async (message: string) => {
        if(!user) return
        const newMessage: Message = {
            createdAt: new Date(), 
            message, 
            read: false, 
            sender: user, 
            id: generateRandomId()
        }
        await messageService.sendMessage(newMessage)
    }

    const onMessagesChanged = (newMessages: Message[]) => {
        console.log({ newMessages })
        setLoadingMessages(false)
        setMessages(newMessages); 
    }

    return(
        <MessageContext.Provider value={{
            messages, 
            isLoadingMessages,
            sendMessage
        }}>
            {children}
        </MessageContext.Provider>
    )

}