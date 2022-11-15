import { ReactNode } from 'react';
import { TouchableOpacity, ViewStyle, View } from 'react-native';
import { Text } from "../text"
import { styles } from "./styles"

interface Props {
    children: ReactNode
    onPress: () => void
    style?: ViewStyle
    icon?: any
}

export const Button: React.FC<Props> = ({ children, onPress, icon, style }) => {

  const renderIcon = () => {
    return (
      <View style={styles.icon}>
        {icon}
      </View>
    )
  }
  
  return(
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
        {!!icon && renderIcon()}
        <Text fontWeight='semibold' style={styles.buttonText}>
            {children}
        </Text>
    </TouchableOpacity>
  )
}