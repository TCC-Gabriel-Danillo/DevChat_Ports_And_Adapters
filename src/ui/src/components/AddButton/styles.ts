import { DARK, PRIMARY, SECONDARY, WHITE } from "@ui/src/constants"
import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
    button: {
        width: 50, 
        height: 50, 
        borderRadius: 50, 
        justifyContent: "center", 
        alignItems: "center"
    }, 
    primary: {
        backgroundColor: PRIMARY, 
        color: WHITE,
        fontSize: 30
    }, 
    secondary: {
        backgroundColor: SECONDARY, 
        color: DARK, 
        fontSize: 30
    }
})

export default styles