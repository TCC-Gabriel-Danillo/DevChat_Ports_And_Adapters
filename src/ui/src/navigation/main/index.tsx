import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ConvesationProviderComposer } from '@ui/src/composes';
import { MAIN_SCREENS } from '@ui/src/constants';
import { HomeScreen } from '@ui/src/screens';
import { mainOptions } from "./options";

const Stack =  createNativeStackNavigator()

export function MainNavigation(){


    return (
        <ConvesationProviderComposer>   
            <Stack.Navigator screenOptions={mainOptions}>
                    <Stack.Screen 
                        name={MAIN_SCREENS.HOME_SCREEN} 
                        component={HomeScreen}
                        options={{ title: "Conversas" }}
                        />
            </Stack.Navigator>
        </ConvesationProviderComposer>
    )
}