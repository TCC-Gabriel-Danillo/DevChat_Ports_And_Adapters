import { Conversation, User } from "@domain/entities/models";
import { ConversationUseCase } from "@domain/entities/usecases";
import { VoidCallback } from "@domain/repositories";
import { HomeScreen } from "@ui/src/screens/HomeScreen"
import { render, fireEvent } from "@testing-library/react-native";
import { AuthContext, ConversationContextProvider } from "@ui/src/context";
import { MAIN_SCREENS, TEST_ID } from "@ui/src/constants";
import { act } from "react-test-renderer";

const mockedNavigate = jest.fn()
jest.mock('@ui/src/hooks/useMainNavigation', () => ({
    useMainNavigation: () => ({
        navigate: mockedNavigate
    })
}));


const mockedLoggedUser = {
    email: "any_email",
    id: "any_id",
    username: "any_username",
    photoUrl: "any_url",
    techs: ["tech_1", "tech_2"]
}
const mockedParticipant = {
    email: "any_email2",
    id: "any_id2",
    username: "any_username2",
    photoUrl: "any_url2",
    techs: ["tech_2", "tech_3"]
}

const mockedConversation = {
    id: "any_id",
    createdAt: new Date(),
    lastSenderId: "any_senderId",
    tech: "any_tech",
    unreadNumber: 0,
    updatedAt: new Date(),
    users: [mockedLoggedUser, mockedParticipant]
}

class ConversationServiceStub implements ConversationUseCase {
    updateConversationById(conversation: Conversation): Promise<void> {
        return Promise.resolve()
    }
    createConversation(conversation: Conversation): Promise<void> {
        return Promise.resolve()
    }
    deleteConversation(conversation: Conversation): Promise<void> {
        return Promise.resolve()
    }
    listenConversationsByUserId(userId: string, cb: VoidCallback<Conversation>): void {
        cb([mockedConversation])
    }
    unlistenConversationsByUserId(): void { }
}

const conversationServiceStub = new ConversationServiceStub()
const renderComponent = () => {
    return (
        <AuthContext.Provider value={{
            isAuthenticated: true,
            isAuthenticating: false,
            loginWithGithub: jest.fn(),
            logout: jest.fn(),
            user: { id: "any_id" } as User
        }}>
            <ConversationContextProvider conversationService={conversationServiceStub}>
                <HomeScreen />
            </ConversationContextProvider>
        </AuthContext.Provider>
    )
}

describe("Home", () => {
    it("should redender a conversation card", async () => {
        const { findByText } = render(
            renderComponent()
        );

        const userCard = await findByText("any_username2");

        expect(userCard).toBeTruthy()
    })

    it("should navigate to message screen", async () => {
        const { findByText } = render(
            renderComponent()
        );

        const userCard = await findByText("any_username2");

        await act(() => {
            fireEvent.press(userCard)
        });

        expect(mockedNavigate).toHaveBeenCalledWith(MAIN_SCREENS.MESSAGE_SCREEN, {
            conversation: mockedConversation,
            participant: mockedParticipant
        })

    })

    it("Should try to navigate to tech screen", async () => {
        const { findByTestId } = render(
            renderComponent()
        );

        const addButton = await findByTestId(TEST_ID.ADD_BUTTON);
        await act(() => {
            fireEvent.press(addButton)
        });

        expect(mockedNavigate).toHaveBeenCalledWith(MAIN_SCREENS.TECH_SCREEN)
    })
})