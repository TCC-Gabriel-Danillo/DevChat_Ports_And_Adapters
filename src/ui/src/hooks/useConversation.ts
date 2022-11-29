import { useContext } from "react"
import { ConversationContext } from "../context"

export const useConversation = () => useContext(ConversationContext)