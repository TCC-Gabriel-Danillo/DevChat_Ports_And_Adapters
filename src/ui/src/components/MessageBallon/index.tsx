import { View } from "react-native"
import { Text } from "@ui/src/components/Text"
import { COLORS, ICONS } from "@ui/src/constants"
import styles from "./styles"

interface Props {
    isSender: boolean
    isRead: boolean
    message: string
    formatedDate: string
}

export function MessageBallon({ isRead, isSender, message, formatedDate }: Props) {
    return (
        <View
            style={[
                styles.container,
                !isSender &&
                styles.containerReciever
            ]}
        >
            <View
                style={[
                    styles.balloon,
                    !isSender && styles.ballonReciever
                ]}
            >
                <Text>{message}</Text>
                <View style={[
                    styles.info,
                    !isSender &&
                    styles.infoReciever
                ]}>
                    <Text style={styles.date}>{formatedDate}</Text>
                    {!!isRead && isSender && <ICONS.EYE size={15} />}
                </View>
            </View>
            <View style={[styles.arrow, !isSender && styles.arrowReciever]} />
        </View>
    )
}