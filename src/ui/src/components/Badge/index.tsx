import { View } from "react-native"
import { Text } from "@ui/src/components/Text"
import styles from "./styles"

interface Props {
    text: string | number
}

export function Badge({ text }: Props){
    return(
        <View style={styles.container}>
            <Text>{text}</Text>
        </View>
    )
}