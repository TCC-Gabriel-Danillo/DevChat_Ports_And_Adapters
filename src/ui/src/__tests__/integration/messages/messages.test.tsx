import { Message } from "@domain/entities/models";
import { MessageUseCase } from "@domain/entities/usecases";
import { VoidCallback } from "@domain/repositories";
import { fireEvent, render } from "@testing-library/react-native";
import { TEST_ID } from "@ui/src/constants";
import { AuthContext, ConversationContext, MessageContextProvider } from "@ui/src/context";
import { MessageScreen } from "@ui/src/screens";
import { act } from "react-test-renderer";
import { mockedLoggedUser, mockedConversation } from "../../mocks/models";
import { mockedMessages } from "../../mocks/models/messages";


class MessageServiceStub implements MessageUseCase {
    sendMessage(message: Message): Promise<void> {
        return Promise.resolve()
    }
    updateMessage(message: Message): Promise<void> {
        return Promise.resolve()
    }
    listenMessages(cb: VoidCallback<Message>): void {
        cb(mockedMessages)
    }
    unlistenMessages(): void {
        return
    }
}

const messageServiceStub = new MessageServiceStub()

const mockedUpdateConversation = jest.fn()

const renderComponent = () => {
    return (
        <AuthContext.Provider
            value={{
                isAuthenticated: true,
                isAuthenticating: false,
                loginWithGithub: jest.fn(),
                logout: jest.fn(),
                user: mockedLoggedUser
            }}
        >
            <ConversationContext.Provider
                value={{
                    createNewConversation: jest.fn(),
                    isLoadingConversations: false,
                    updateConversationInfo: mockedUpdateConversation,
                    conversations: [mockedConversation]
                }}
            >
                <MessageContextProvider
                    conversation={mockedConversation}
                    messageService={messageServiceStub}
                >
                    <MessageScreen />
                </MessageContextProvider>
            </ConversationContext.Provider>

        </AuthContext.Provider>
    )
}


describe("Message Screen", () => {
    it("Should list messages as mark messages as read", async () => {
        const { findAllByTestId } = render(renderComponent())
        const messagesBallons = await findAllByTestId(TEST_ID.MESSAGE_BALLON)
        expect(messagesBallons.length).toBe(3)
    })

    it("Should send a new message", async () => {
        const spy = jest.spyOn(messageServiceStub, "sendMessage")
        const { findByTestId } = render(renderComponent())
        const sendButtom = await findByTestId(TEST_ID.SEND_BUTTON)

        await act(() => {
            fireEvent.press(sendButtom)
        })

        expect(spy).toBeCalled()

    })
})