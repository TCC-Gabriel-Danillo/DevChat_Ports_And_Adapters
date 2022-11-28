import { createContext, useState, useEffect } from "react"
import { Conversation, Message } from "@domain/entities/models"
import { MessageUseCase } from "@domain/entities/usecases"
import { useAuth } from "@ui/src/hooks/useAuth"
import { generateRandomId } from '@ui/src/utils/generateRandomId';
import { useConversation } from "../hooks/useConversation";

interface Props {
    children: JSX.Element
    messageService: MessageUseCase
    conversation: Conversation
}


interface MessageContextData {
    messages: Message[]
    isLoadingMessages: boolean
    sendMessage: (messateText: string) => Promise<void>
    markAsRead: (message: Message) => Promise<void>
}


export const MessageContext = createContext<MessageContextData>({} as MessageContextData)

export function MessageContextProvider({ children, messageService, conversation }: Props) {
    const [messages, setMessages] = useState<Message[]>([])
    const [currentConversation, setCurrentConversation] = useState(conversation)
    const [isLoadingMessages, setLoadingMessages] = useState(true)
    const { user } = useAuth()
    const { updateConversationInfo } = useConversation()

    useEffect(() => {
        messageService.listenMessages(onMessagesChanged)
        return () => messageService.unlistenMessages()
    }, [])

    const sendMessage = async (messateText: string) => {
        if (!user) return
        const newMessage: Message = {
            createdAt: new Date(),
            message: messateText,
            read: false,
            sender: user,
            id: generateRandomId()
        }
        await messageService.sendMessage(newMessage)
    }

    const onMessagesChanged = (newMessages: Message[]) => {
        setLoadingMessages(false)
        setMessages(newMessages);
        updateConversation(newMessages)
    }

    const updateConversation = async (newMessages: Message[]) => {
        const lastMessage = newMessages[newMessages.length - 1]

        const newConversation: Conversation = {
            ...currentConversation,
            lastSenderId: lastMessage.sender.id,
            unreadNumber: getUnreadNumber(newMessages, lastMessage.sender.id)
        }
        setCurrentConversation(newConversation)
        updateConversationInfo(newConversation)
    }

    const getUnreadNumber = (messages: Message[], lastSenderId: string) => {
        return messages.filter(m => m.sender.id === lastSenderId && !m.read).length
    }

    const markAsRead = async (message: Message) => {
        const shouldMarkAsRead = message.sender.id !== user?.id && !message.read
        const newMessage: Message = {
            ...message,
            read: true
        }
        if (shouldMarkAsRead) messageService.updateMessage(newMessage)
    }


    return (
        <MessageContext.Provider value={{
            messages,
            isLoadingMessages,
            sendMessage,
            markAsRead
        }}>
            {children}
        </MessageContext.Provider>
    )

}