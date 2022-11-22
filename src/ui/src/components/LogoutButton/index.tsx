import MaterialCommunityIcons from "@expo/vector-icons/build/MaterialCommunityIcons"
import { TEST_ID, WHITE } from "@ui/src/constants"
import { useAuth } from "@ui/src/hooks"
import React from "react"
import { IconButton } from "../IconButton"

export function LogoutButton(){
    const { logout } = useAuth()
    return (
        <IconButton 
            testID={TEST_ID.LOGOUT}
            onPress={logout} 
            icon={ <MaterialCommunityIcons name="logout" size={24} color={WHITE} /> } 
        />
    )
}


