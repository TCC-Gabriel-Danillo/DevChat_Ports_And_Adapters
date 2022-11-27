import { BaseComponent } from '@ui/src/types';
import { ReactNode } from 'react';
import { TextStyle, Text as RnText } from 'react-native';
import { styles } from "./styles"

interface Props extends BaseComponent {
    fontType?: 'h1' | 'h2' | 'p'
    fontWeight?: 'bold' | 'semibold' | 'regular'
    style?: TextStyle
    children: ReactNode
}

export const Text: React.FC<Props> = ({
    fontType = 'p', 
    fontWeight = 'regular',
    style,
    children, 
    ...rest
 }) => {
  const fontTypeStyle = styles[fontType]; 
  const fontWeightStyle = styles[fontWeight];
  return(
    <RnText style={[fontTypeStyle, fontWeightStyle, style]} {...rest}>
        {children}
    </RnText>
  )
}