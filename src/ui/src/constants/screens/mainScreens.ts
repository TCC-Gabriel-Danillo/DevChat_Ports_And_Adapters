import { User } from "@domain/entities/models"

export enum MAIN_SCREENS {
    HOME_SCREEN="HOME_SCREEN",
    MESSAGE_SCREEN="MESSAGE_SCREEN", 
    TECH_SCREEN="TECH_SCREEN", 
    USERS_SCREEN="USERS_SCREEN"
}

export type MAIN_SCREEN_ARGS = {
    [MAIN_SCREENS.HOME_SCREEN]: undefined
    [MAIN_SCREENS.TECH_SCREEN]: undefined
    [MAIN_SCREENS.MESSAGE_SCREEN]: { 
        conversationId: string
        participant: User 
    }
    [MAIN_SCREENS.USERS_SCREEN] : { tech: string }
}