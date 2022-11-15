import { StyleSheet } from "react-native"
import { PRIMARY, WHITE } from "@ui/src/constants"

export const styles = StyleSheet.create({
    button: {
        backgroundColor: PRIMARY, 
        width: "100%", 
        height: 40, 
        justifyContent: "center", 
        alignItems: "center",
        padding: 10, 
        borderRadius: 5, 
        flexDirection: 'row'
    }, 
    buttonText: {
        color: WHITE, 
    }, 
    icon: {
        marginRight: 8
    }
})