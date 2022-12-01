import { Conversation, Message } from "@domain/entities/models";
import { MessageUseCase } from "@domain/entities/usecases";
import { VoidCallback } from "@domain/repositories";
import { fireEvent, render } from "@testing-library/react-native";
import { TEST_ID } from "@ui/src/constants";
import { AuthContext, ConversationContext, MessageContextProvider } from "@ui/src/context";
import { MessageScreen } from "@ui/src/screens";
import { act } from "react-test-renderer";


const mockedAuthUser = {
    email: "authed_email",
    id: "auhted_id",
    username: "auhted_username",
    photoUrl: "auhted_url",
    techs: ["any_tech1", "any_tech2"]
}

const mockedParticipant = {
    email: "any_email",
    id: "any_id",
    username: "any_username",
    photoUrl: "any_url",
    techs: ["any_tech1", "any_tech2"]
}

const mockedUsers = [
    mockedAuthUser,
    mockedParticipant
]

const mockedConversation: Conversation = {
    id: "any_id",
    createdAt: new Date(),
    lastSenderId: "any_senderId",
    tech: "any_tech",
    unreadNumber: 0,
    updatedAt: new Date(),
    users: mockedUsers
}

const mockedMessages: Message[] = [
    { createdAt: new Date(), id: "any_id", message: "any_message", read: false, sender: mockedAuthUser },
    { createdAt: new Date(), id: "any_id2", message: "any_message2", read: false, sender: mockedAuthUser },
    { createdAt: new Date(), id: "any_id3", message: "any_message3", read: false, sender: mockedParticipant }
]

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
    unlistenMessages(): void { }
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
                user: mockedAuthUser
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