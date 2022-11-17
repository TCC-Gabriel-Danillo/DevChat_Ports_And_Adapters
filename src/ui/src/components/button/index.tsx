import { BaseComponent } from '@ui/src/types/BaseComponent';
import { ReactNode } from 'react';
import { TouchableOpacity, ViewStyle, View } from 'react-native';
import { Text } from "../text"
import { styles } from "./styles"

interface Props extends BaseComponent {
    children: ReactNode
    onPress: () => void
    style?: ViewStyle
    icon?: any
}

export const Button: React.FC<Props> = ({ children, onPress, icon, style, ...rest}) => {

  const renderIcon = () => {
    return (
      <View style={styles.icon}>
        {icon}
      </View>
    )
  }
  
  return(
    <TouchableOpacity style={[styles.button, style]} onPress={onPress} {...rest}>
        {!!icon && renderIcon()}
        <Text fontWeight='semibold' style={styles.buttonText}>
            {children}
        </Text>
    </TouchableOpacity>
  )
}