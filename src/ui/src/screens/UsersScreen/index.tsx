import { Container } from "@ui/src/components";
import { Text, Loading } from "@ui/src/components"
import { useUsers } from "@ui/src/hooks/useUsers";
import { useRoute } from "@react-navigation/native"
import { NavOpts } from "@ui/src/navigation/main";
import { MAIN_SCREENS } from "@ui/src/constants";
import { RouteProp } from "@react-navigation/native";
import { useEffect } from "react";
import { FlatList } from "react-native";
import { Empty, UserCard } from "@ui/src/components";
import { parseArrayToString } from "@ui/src/utils";
import styles from "./styles"

export function UsersScreen(){
    const { users, getUsersByTech, isLoadingUsers } = useUsers()
    const { params } = useRoute<RouteProp<NavOpts, MAIN_SCREENS.USERS_SCREEN>>()

    useEffect(() => {
        getUsersByTech(params.tech)
    }, [])

    if(isLoadingUsers) return <Loading />

    const renderUserList = () => {
        return (
            <FlatList 
                data={users}
                renderItem={({item: user}) => {
                    return(
                        <UserCard 
                            style={styles.userCard}
                            photoUrl={user.photoUrl}
                            title={user.username}
                            subtile={parseArrayToString(user.techs, { limit: 5, separator:", "})}
                        /> 
                    )
                }}
            />
        )
    }

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