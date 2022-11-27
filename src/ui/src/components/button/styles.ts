import { StyleSheet } from "react-native"
import { PRIMARY, WHITE, SECONDARY, DARK } from "@ui/src/constants"

export const styles = StyleSheet.create({
    button: {
        width: "100%", 
        height: 40, 
        justifyContent: "center", 
        alignItems: "center",
        padding: 10, 
        borderRadius: 5, 
        flexDirection: 'row'
    }, 
    primary: {
        backgroundColor: PRIMARY, 
    }, 
    secondary: {
        backgroundColor: SECONDARY, 

    },
    buttonTextPrimary: {
        color: WHITE, 
    }, 
    buttonTextSecondary: {
        color: DARK, 
    }, 
    icon: {
        marginRight: 8
    }
})