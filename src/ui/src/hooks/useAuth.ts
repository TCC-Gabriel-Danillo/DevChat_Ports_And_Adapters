import { useContext } from 'react'
import { AuthContext } from '@ui/src/context'

export const useAuth = () => useContext(AuthContext)