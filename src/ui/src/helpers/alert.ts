import { Alert } from "react-native";

export function alert(error: any){
    if(error instanceof Error){
        Alert.alert(error.message)
        return
    }
    if(typeof error === 'string'){
        Alert.alert(error)
        return 
    }
    Alert.alert("Something went wrong.")
}