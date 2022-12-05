import { Conversation, User } from "@domain/entities/models";
import { UsersUseCase } from "@domain/entities/usecases";
import { fireEvent, render } from "@testing-library/react-native";
import { MAIN_SCREENS, TEST_ID } from "@ui/src/constants";
import { AuthContext, ConversationContextProvider, UsersContextProvider } from "@ui/src/context";
import { UsersScreen } from "@ui/src/screens";
import { act } from "react-test-renderer";
import { mockedConversation, mockedLoggedUser, mockedParticipant } from "../../mocks/models";
import { ConversationServiceStub, UserServiceStub } from "../../mocks/stubs";

const mockedNavigate = jest.fn()
jest.mock('@ui/src/hooks/useMainNavigation', () => ({
    useMainNavigation: () => ({
        navigate: mockedNavigate
    })
}));

jest.mock('@ui/src/hooks/useMainRoute', () => ({
    useMainRoute: () => ({
        params: {
            tech: "any_tech"
        }
    })
}));


const conversationServiceStub = new ConversationServiceStub()
const userServiceStub = new UserServiceStub()

const renderComponent = () => {
    return (
        <AuthContext.Provider value={{
            isAuthenticated: true,
            isAuthenticating: false,
            loginWithGithub: jest.fn(),
            logout: jest.fn(),
            user: mockedLoggedUser
        }}>
            <ConversationContextProvider
                conversationService={conversationServiceStub}
            >
                <UsersContextProvider
                    usersService={userServiceStub}
                >
                    <UsersScreen />
                </UsersContextProvider>

            </ConversationContextProvider>
        </AuthContext.Provider>
    )
}




describe("Users Screen", () => {

    it("should list users", async () => {
        const { findAllByTestId } = render(renderComponent())
        const userCards = await findAllByTestId(TEST_ID.USER_CARD)
        expect(userCards.length).toBe(1)
    })

    it("should render empty message when there's no users", async () => {
        jest.spyOn(userServiceStub, "listUsersByTech").mockReturnValueOnce(Promise.resolve([]))
        const { findByTestId } = render(renderComponent())
        const emptyMessage = await findByTestId(TEST_ID.EMPTY_MESSAGE)
        expect(emptyMessage).toBeTruthy()
    })

    it("should navigate to the message screen", async () => {
        const { findByText } = render(renderComponent())
        const userCard = await findByText("any_username2")

        await act(() => {
            fireEvent.press(userCard)
        })

        expect(mockedNavigate).toHaveBeenCalledWith(MAIN_SCREENS.MESSAGE_SCREEN, {
            conversation: mockedConversation,
            participant: mockedParticipant
        })
    })

    it("should create a new conversation", async () => {
        jest.spyOn(conversationServiceStub, "listenConversationsByUserId").mockImplementation((userId, cb) => cb([]))
        const spy = jest.spyOn(conversationServiceStub, "createConversation");

        const { findByText } = render(renderComponent())
        const userCard = await findByText("any_username2")

        await act(() => {
            fireEvent.press(userCard)
        })
        expect(spy).toHaveBeenCalled()
    })
})