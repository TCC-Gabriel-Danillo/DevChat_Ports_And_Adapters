import { User } from '@domain/entities/models';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ConvesationProviderComposer, MessageProviderComposer } from '@ui/src/composes';
import { MAIN_SCREENS } from '@ui/src/constants';
import { MessageScreen, HomeScreen, TechScreen } from '@ui/src/screens';
import { mainOptions } from "./options";

export type  NavOpts = {
    [MAIN_SCREENS.HOME_SCREEN]: undefined;
    [MAIN_SCREENS.TECH_SCREEN]: undefined;
    [MAIN_SCREENS.MESSAGE_SCREEN]: { 
        conversationId: string
        participant: User 
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
                        name={MAIN_SCREENS.TECH_SCREEN} 
                        component={TechScreen}
                        options={{ title: "Suas tecnologias" }}
                    />
                    <Stack.Screen 
                        name={MAIN_SCREENS.MESSAGE_SCREEN} 
                        options={({ route }) => ({ title: route.params.participant.username })}
                    >
                       {({ route })  => {
                            const { conversationId } = route.params
                            return( 
                                <MessageProviderComposer conversationId={conversationId}>
                                    <MessageScreen />
                                </MessageProviderComposer>
                            )
                       }}
                    </Stack.Screen>
            </Stack.Navigator>
        </ConvesationProviderComposer>
    )
}

