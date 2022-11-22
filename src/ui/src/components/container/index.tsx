import { BaseComponent } from '@ui/src/types/BaseComponent';
import React, { ReactNode } from 'react';
import { View, ViewStyle } from 'react-native';
import { styles } from './styles'

interface Props extends BaseComponent {
    children: ReactNode
    style?: ViewStyle
}
export const Container: React.FC<Props> = ({ children, style, ...rest }) => {
  return(
    <View style={[styles.container, style]} {...rest}>
        {children}
    </View>
  )
}
