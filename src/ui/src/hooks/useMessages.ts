import { useContext } from "react"
import { MessageContext } from "../context"

export const useMessages = () => useContext(MessageContext)