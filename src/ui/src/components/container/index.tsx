import React, { ReactNode } from 'react';
import { View, ViewStyle } from 'react-native';
import { styles } from './styles'

interface Props {
    children: ReactNode
    style?: ViewStyle
}
export const Container: React.FC<Props> = ({ children, style }) => {
  return(
    <View style={[styles.container, style]}>
        {children}
    </View>
  )
}
