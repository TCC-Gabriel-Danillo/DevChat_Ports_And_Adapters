import { useContext } from 'react'
import { AuthContext } from '@ui/src/context/AuthContext'

export const useAuth = () => useContext(AuthContext)