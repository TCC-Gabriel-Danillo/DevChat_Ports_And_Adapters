import { useRoute, RouteProp } from "@react-navigation/native"
import { NavOpts } from "@ui/src/navigation/main";

export const useMainRoute = <T extends keyof NavOpts>() => useRoute<RouteProp<NavOpts, T>>()