import { Container, Text } from "@ui/src/components";
import { COLORS } from "@ui/src/constants";
import { useAuth } from "@ui/src/hooks";
import { View } from "react-native"; 
import { ICONS } from "@ui/src/constants"

export function TechScreen(){
    const { user } = useAuth()

    return(
        <Container>
            <Text fontType="h2" style={{ marginBottom: 20 }}>Escolha a tecnologia para iniciar sua conversa: </Text>
            {user?.techs?.map(tech =>(
                <View 
                    key={tech}
                    style={{ 
                        backgroundColor: COLORS.WHITE, 
                        marginBottom: 10, 
                        padding: 15, 
                        borderRadius: 5 , 
                        flexDirection: "row", 
                        justifyContent: "space-between", 
                        alignItems: "center"
                    }}
                >
                    <Text>{tech}</Text>
                    <ICONS.CARRET_RIGHT color={COLORS.LIGHT} />
                </View>
            ))}
        </Container>
    )
}