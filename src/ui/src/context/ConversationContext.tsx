import { Conversation } from '@domain/entities/models'
import { ConversationUseCase } from '@domain/entities/usecases'
import { createContext, useState, useEffect, ReactNode } from 'react'
import { useAuth } from '../hooks'


interface ConversationContextInfo {
    conversations?: Conversation[]
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
    
    useEffect(() => {
        if(!userId) return
        conversationService.listenConversationsByUserId(userId, setConversations)
        return () => conversationService.unlistenConversationsByUserId()

    }, [userId])

    return(
        <ConversationContext.Provider value={{ 
            conversations 
        }}>
            {children}
        </ConversationContext.Provider>
    )
}