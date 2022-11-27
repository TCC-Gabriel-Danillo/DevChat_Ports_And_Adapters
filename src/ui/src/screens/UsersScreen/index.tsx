import { Container } from "@ui/src/components";
import { Text, Loading } from "@ui/src/components"
import { useUsers } from "@ui/src/hooks/useUsers";
import { useRoute } from "@react-navigation/native"
import { NavOpts } from "@ui/src/navigation/main";
import { MAIN_SCREENS, SCREEN_WIDTH } from "@ui/src/constants";
import { RouteProp } from "@react-navigation/native"
import { useEffect } from "react";
import { FlatList, View, Image } from "react-native";

export function UsersScreen(){
    const { users, getUsersByTech, isLoadingUsers } = useUsers()
    const { params } = useRoute<RouteProp<NavOpts, MAIN_SCREENS.USERS_SCREEN>>()

    useEffect(() => {
        getUsersByTech(params.tech)
    }, [])

    if(isLoadingUsers) return <Loading />

    return(
        <Container>
            <Text>
                Usuários interessados na tecnologia <Text fontWeight="bold" >{params.tech}:</Text>
            </Text>
            <FlatList 
                ListEmptyComponent={<Text>Não há usuários interessados nessa tecnologia.</Text>}
                data={users}
                renderItem={({item: user}) => {
                    return(
                        <View style={{ flexDirection: 'row', marginTop: 20, alignItems: "center", width: SCREEN_WIDTH * 0.7 }}>
                            <Image source={{ uri: user.photoUrl }} style={{ width: 60, height: 60, borderRadius: 60 }}/>
                            <View style={{ marginLeft: 10 }}>
                                <Text fontWeight="bold">{user.username}</Text>
                                <Text style={{ fontSize: 14 }}>{user.techs?.slice(0,5).join(", ") + "..."}</Text>
                            </View>
                        </View>
                    )
                }}
            />
        </Container>
    )    
}