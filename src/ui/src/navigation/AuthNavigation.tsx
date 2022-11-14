import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthScreen } from '@ui/src/screens';
import { AUTH_SCREENS } from '../constants';

const Stack =  createNativeStackNavigator()

export function AuthNavigation(){
    return (
        <Stack.Navigator>
            <Stack.Screen name={AUTH_SCREENS.AUTH_SCREEN} component={AuthScreen}/>
        </Stack.Navigator>
    )
}