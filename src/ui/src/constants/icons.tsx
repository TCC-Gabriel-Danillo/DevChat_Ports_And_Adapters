import { 
    FontAwesome, 
    AntDesign, 
    MaterialCommunityIcons 
} from '@expo/vector-icons';

import { DARK } from './colors';

interface IconProps {
    size?: number
    color?: string
}
export const ICONS = {
    CARRET_RIGHT: ({color = DARK, size = 24}: IconProps) =>  <FontAwesome name="caret-right" size={size} color={color} />, 
    GIT_HUB: ({color = DARK, size = 24}: IconProps) =>  <AntDesign name="github" size={size} color={color} />, 
    LOGOUT: ({color = DARK, size = 24}: IconProps) => <MaterialCommunityIcons size={size} color={color} />
}   