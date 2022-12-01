import { Card, Container, Text } from "@ui/src/components";
import { COLORS, MAIN_SCREENS, TEST_ID } from "@ui/src/constants";
import { useAuth, useMainNavigation } from "@ui/src/hooks";
import { ICONS } from "@ui/src/constants"
import styles from "./styles"
import { FlatList } from "react-native";


export function TechScreen() {
    const { user } = useAuth()
    const navigation = useMainNavigation()

    const navigateToUsersScreen = (tech: string) => navigation.navigate(MAIN_SCREENS.USERS_SCREEN, { tech })

    return (
        <Container>
            <Text fontType="h2" style={styles.title}>Escolha uma de suas tecnologias para iniciar sua conversa: </Text>
            <FlatList
                data={user?.techs}
                renderItem={({ item: tech }) => {
                    return (
                        <Card
                            testID={TEST_ID.TECH_CARD}
                            onPress={() => navigateToUsersScreen(tech)}
                            key={tech}
                            icon={<ICONS.CARRET_RIGHT color={COLORS.GREY} />}
                            style={styles.card}
                        >
                            <Text style={styles.tech}>{tech}</Text>
                        </Card>
                    )
                }}
            />
        </Container>
    )
}