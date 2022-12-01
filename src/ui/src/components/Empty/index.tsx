import { View, Image } from "react-native"
import { Text } from "../Text"
import emptyImg from "@ui/assets/empty.png"
import styles from "./styles"
import { TEST_ID } from "@ui/src/constants"

interface Props {
    message?: string
}

export function Empty({ message = "Nada para ver por aqui." }: Props) {
    return (
        <View style={styles.container} testID={TEST_ID.EMPTY_MESSAGE}>
            <Image source={emptyImg} style={styles.image} />
            <Text style={styles.message}>{message}</Text>
        </View>
    )
}