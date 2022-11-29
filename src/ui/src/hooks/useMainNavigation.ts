import { useNavigation, NavigationProp } from "@react-navigation/native"
import { NavOpts } from "../navigation/main"

export const useMainNavigation = () => useNavigation<NavigationProp<NavOpts>>()
