import { User } from '@domain/entities/models';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ConvesationProviderComposer, MessageProviderComposer, UsersProviderComposer } from '@ui/src/composes';
import { MAIN_SCREENS, MAIN_SCREEN_ARGS } from '@ui/src/constants';
import { MessageScreen, HomeScreen, TechScreen, UsersScreen } from '@ui/src/screens';
import { mainOptions } from "./options";

export type  NavOpts = {
    [MAIN_SCREENS.HOME_SCREEN]: undefined;
    [MAIN_SCREENS.TECH_SCREEN]: undefined;
    [MAIN_SCREENS.USERS_SCREEN]: MAIN_SCREEN_ARGS[MAIN_SCREENS.USERS_SCREEN]; 
    [MAIN_SCREENS.MESSAGE_SCREEN]: MAIN_SCREEN_ARGS[MAIN_SCREENS.MESSAGE_SCREEN]; 
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
                        name={MAIN_SCREENS.USERS_SCREEN} 
                        options={{ title: "Usuários" }}
                    >
                        {() => {
                            return(
                                <UsersProviderComposer>
                                    <UsersScreen />
                                </UsersProviderComposer>
                             )
                        }}
                    </Stack.Screen>
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

