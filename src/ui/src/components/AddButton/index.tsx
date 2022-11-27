import { 
    TouchableOpacity, 
    ViewStyle, 
    TouchableOpacityProps 
} from "react-native"

import { Text } from "@ui/src/components/Text"

import styles from "./styles"
import { UiType } from "@ui/src/types"

interface Props extends TouchableOpacityProps {
    style?: ViewStyle
    type?: UiType 
}

export function AddButton({ style, type="primary", ...rest }: Props){

    const styleByType = styles[type]

    return(
        <TouchableOpacity style={[ styles.button, styleByType ,style ]} {...rest} >
            <Text style={styleByType}>+</Text>
        </TouchableOpacity>
    )
}