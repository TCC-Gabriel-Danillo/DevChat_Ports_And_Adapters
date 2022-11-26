import { User } from '@domain/entities/models';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ConvesationProviderComposer } from '@ui/src/composes';
import { MAIN_SCREENS } from '@ui/src/constants';
import { ConversationScreen, HomeScreen } from '@ui/src/screens';
import { mainOptions } from "./options";

export type  NavOpts = {
    [MAIN_SCREENS.HOME_SCREEN]: undefined;
    [MAIN_SCREENS.CONVERSATION_SCREEN]: { 
        conversationId: string
        users: User[] 
    }
}

const Stack =  createNativeStackNavigator<NavOpts>()

export function MainNavigation(){
    return (
        <ConvesationProviderComposer>   
            <Stack.Navigator screenOptions={mainOptions}>
                    <Stack.Screen 
                        name={MAIN_SCREENS.HOME_SCREEN} 
                        component={HomeScreen}
                        options={{ title: "Conversas" }}
                        />
                    <Stack.Screen 
                        name={MAIN_SCREENS.CONVERSATION_SCREEN} 
                        options={{ title: "Conversas" }}
                    >
                       {({ route })  => {
                        console.log(route.params)
                        return <ConversationScreen />
                       }}
                    </Stack.Screen>
            </Stack.Navigator>
        </ConvesationProviderComposer>
    )
}