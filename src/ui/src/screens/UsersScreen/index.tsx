import { Container } from "@ui/src/components";
import { Text, Loading } from "@ui/src/components"
import { useUsers } from "@ui/src/hooks/useUsers";
import { MAIN_SCREENS } from "@ui/src/constants";
import { useEffect } from "react";
import { FlatList, TouchableOpacity } from "react-native";
import { Empty, UserCard } from "@ui/src/components";
import { parseArrayToString } from "@ui/src/utils";
import styles from "./styles"
import { useAuth, useConversation, useMainNavigation, useMainRoute } from "@ui/src/hooks";
import { User } from "@domain/entities/models";

export function UsersScreen(){
    const { users, getUsersByTech, isLoadingUsers } = useUsers()
    const { params } = useMainRoute<MAIN_SCREENS.USERS_SCREEN>()  
    const navigation = useMainNavigation()
    const { conversations, createNewConversation } = useConversation()
    const { user: authenticatedUsed } = useAuth()

    useEffect(() => {
        getUsersByTech(params.tech)
    }, [])

    const renderUserList = () => {
        return (
            <FlatList 
                data={users}
                renderItem={({item: user}) => {
                    return(
                        <TouchableOpacity
                            onPress={() => onUserPressed(user)}
                        >
                            <UserCard 
                                style={styles.userCard}
                                photoUrl={user.photoUrl}
                                title={user.username}
                                subtile={parseArrayToString(user.techs, { limit: 5, separator:", "})}
                            /> 
                        </TouchableOpacity>
                    )
                }}
            />
        )
    }


    const onUserPressed = async (user: User) => {
        
        if(!authenticatedUsed) return 

        const conversationExists = checkIfConversationExists(user)
        if(conversationExists){
            goToMessageScreen(conversationExists.id, user); 
            return
        }

        const participants = [authenticatedUsed, user]
        const newConversation = await createNewConversation(participants, params.tech)
        goToMessageScreen(newConversation.id, user); 
    }

    const checkIfConversationExists = (user: User) => {
        return conversations?.filter(conversation => {
            return conversation.tech === params.tech && conversation.users.map(_user => _user.id).includes(user.id)
        })[0]
    }


    const goToMessageScreen = (conversationId: string, participant: User) => {
        navigation.navigate(MAIN_SCREENS.MESSAGE_SCREEN, { 
            conversationId: conversationId,
            participant: participant
        })
    }


    if(isLoadingUsers) return <Loading />

 

    return(
        <Container>
            <Text>
                Usuários interessados na tecnologia <Text fontWeight="bold" >{params.tech}:</Text>
            </Text>
           {users.length ? 
                renderUserList() : 
                <Empty message="Não há usuários interessados nessa tecnologia."/>
            }
        </Container>
    )    
}