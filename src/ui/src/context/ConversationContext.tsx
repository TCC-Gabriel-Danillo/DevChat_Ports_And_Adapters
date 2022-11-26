import { Conversation } from '@domain/entities/models'
import { ConversationUseCase } from '@domain/entities/usecases'
import { createContext, useState, useEffect, ReactNode } from 'react'
import { useAuth } from '@ui/src/hooks/useAuth'


interface ConversationContextInfo {
    conversations?: Conversation[]
    isLoadingConversations: boolean
}

export const ConversationContext = createContext<ConversationContextInfo>({} as ConversationContextInfo)

interface Props {
    children: ReactNode
    conversationService: ConversationUseCase
}

export function ConversationContextProvider({ 
    children,  
    conversationService 
}: Props){
    
    const { user } = useAuth()
    const userId = user?.id

    const [conversations, setConversations] = useState<Conversation[]>([])
    const [isLoadingConversations, setLoadingConversations] = useState(true)
    
    useEffect(() => {
        if(!userId) return
        conversationService.listenConversationsByUserId(userId, onConversationChanged)
        return () => conversationService.unlistenConversationsByUserId()

    }, [userId])

    const onConversationChanged = (conversations: Conversation[]) => {
        setConversations(conversations)
        setLoadingConversations(false)
    }

    return(
        <ConversationContext.Provider value={{ 
            conversations, 
            isLoadingConversations
        }}>
            {children}
        </ConversationContext.Provider>
    )
}