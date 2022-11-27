import { Card, Container, Text } from "@ui/src/components";
import { COLORS } from "@ui/src/constants";
import { useAuth } from "@ui/src/hooks";
import { ICONS } from "@ui/src/constants"
import styles from "./styles"

export function TechScreen(){
    const { user } = useAuth()

    const rederCardList = () => {
        return user?.techs?.map(tech =>( 
            <Card 
              icon={<ICONS.CARRET_RIGHT color={COLORS.GREY} />}
              style={styles.card}
             >
              <Text style={styles.tech}>{tech}</Text>        
            </Card>
          )) 
    }

    return(
        <Container>
            <Text fontType="h2" style={styles.title}>Escolha a tecnologia para iniciar sua conversa: </Text>
            {rederCardList()}
        </Container>
    )
}