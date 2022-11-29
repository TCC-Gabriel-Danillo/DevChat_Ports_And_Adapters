import { View, ViewStyle } from "react-native"
import { Text } from "@ui/src/components/Text"
import styles from "./styles"

interface Props {
    text: string | number
    style?: ViewStyle
}

export function Badge({ text, style }: Props){
    return(
        <View style={[styles.container, style]}>
            <Text>{text}</Text>
        </View>
    )
}