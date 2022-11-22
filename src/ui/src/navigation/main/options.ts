import { LogoutButton } from "@ui/src/components";
import { MAIN_SCREENS, PRIMARY, WHITE } from "@ui/src/constants";
import { HomeScreen } from "@ui/src/screens";

export const mainScreens = [
    {
        component: HomeScreen, 
        options: { title: "Conversas"}, 
        name: MAIN_SCREENS.HOME_SCREEN
    }
]

export const mainOptions = {
    headerStyle: {
        backgroundColor: PRIMARY, 
    }, 
    headerTintColor: WHITE, 
    headerRight: LogoutButton
}