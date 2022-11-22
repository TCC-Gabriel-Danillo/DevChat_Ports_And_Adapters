import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { mainScreens, mainOptions } from "./options";

const Stack =  createNativeStackNavigator()

export function MainNavigation(){


    return (
        <Stack.Navigator screenOptions={mainOptions}>
            {
                mainScreens.map(screen => (
                    <Stack.Screen 
                        key={screen.name}
                        name={screen.name} 
                        component={screen.component}
                        options={screen.options}
                    />
              ))
            }
        </Stack.Navigator>
    )
}