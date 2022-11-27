import { useContext } from "react"
import { UsersContext } from "../context"

export const useUsers = () => useContext(UsersContext); 