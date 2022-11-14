import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '@ui/src/screens';
import { MAIN_SCREENS } from '../constants';

const Stack =  createNativeStackNavigator()

export function MainNavigation(){
    return (
        <Stack.Navigator>
            <Stack.Screen name={MAIN_SCREENS.HOME_SCREEN} component={HomeScreen}/>
        </Stack.Navigator>
    )
}