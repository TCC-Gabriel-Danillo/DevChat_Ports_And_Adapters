import { BaseComponent, UiType } from '@ui/src/types';
import { ReactNode } from 'react';
import { TouchableOpacity, ViewStyle, View } from 'react-native';
import { Text } from "../Text"
import { styles } from "./styles"

interface Props extends BaseComponent {
    children: ReactNode
    onPress: () => void
    style?: ViewStyle
    icon?: any
    type?: UiType
}


const getButtonTextStyleByType = (type: UiType) => {
  if(type == "primary") return styles.buttonTextPrimary
  return styles.buttonTextSecondary
}

export const Button: React.FC<Props> = ({ children, onPress, icon, style, type = "primary", ...rest}) => {

  const renderIcon = () => {
    return (
      <View style={styles.icon}>
        {icon}
      </View>
    )
  }

  const buttonBgStyleByType = styles[type]
  const buttonSecondaryStyle = getButtonTextStyleByType(type)
  
  return(
    <TouchableOpacity style={[styles.button ,buttonBgStyleByType, style]} onPress={onPress} {...rest}>
        {!!icon && renderIcon()}
        <Text fontWeight='semibold' style={buttonSecondaryStyle}>
            {children}
        </Text>
    </TouchableOpacity>
  )
}