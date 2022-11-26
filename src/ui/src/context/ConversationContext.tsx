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
        getConversationsByUser()
    }, [userId])

    async function getConversationsByUser(){
        if(!userId) return
        const response = await conversationService.getConversationsByUserId(userId)
        setConversations(response)
    }

    return(
        <ConversationContext.Provider value={{ 
            conversations 
        }}>
            {children}
        </ConversationContext.Provider>
    )
}