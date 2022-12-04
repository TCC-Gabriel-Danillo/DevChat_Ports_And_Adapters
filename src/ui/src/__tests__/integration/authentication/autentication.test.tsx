import React from 'react';
import { Navigation } from '@ui/src/navigation';
import { render, fireEvent } from "@testing-library/react-native";
import { AuthUseCase, Credentials } from '@domain/entities/usecases';
import { User } from '@domain/entities/models';
import { LocalStorageRepository } from '@domain/repositories';
import { AlertContextProvider, AuthContextProvider } from '@ui/src/context';
import { AuthPromptService } from '@ui/src/hooks';
import { act } from 'react-test-renderer';
import { AuthScreen } from '@ui/src/screens';

class AuthServiceStub implements AuthUseCase {
  async authenticateGithub(
    credentials: Credentials
  ): Promise<User | undefined> {
    return Promise.resolve({
      email: "test@test.com",
      id: "123",
      username: "test",
      photoUrl: "photo_url",
      techs: ["tech1", "tech2", "tech3"],
    });
  }
}

class LocalStorageRepositoryStub implements LocalStorageRepository {
  async getItem<T>(key: string): Promise<T | undefined> {
    return Promise.resolve({} as T);
  }
  async setItem(key: string, data: any): Promise<void> { }
  async removeItem(key: string): Promise<void> { }
}

const authPromptServiceStub: AuthPromptService = {
  promptAuth: async () => {
    return {
      code: "1234",
      client_id: "client_id",
      client_secret: "client_secret"
    };
  },
};

const renderComponent = (
  localStorageStub: LocalStorageRepository,
  authServiceStub: AuthUseCase
) => {
  return (
    <AlertContextProvider>
      <AuthContextProvider
        authPromptService={authPromptServiceStub}
        authService={authServiceStub}
        localStorageRepository={localStorageStub}
      >
        <AuthScreen />
      </AuthContextProvider>
    </AlertContextProvider>
  );
};

jest.setTimeout(70000)

describe("Authentication", () => {
  it("Should call authentication method with the right parameters", async () => {
    const localStorageStub = new LocalStorageRepositoryStub();
    const authServiceStub = new AuthServiceStub();
    const { findByText } = render(
      renderComponent(localStorageStub, authServiceStub)
    );

    const button = await findByText("Entrar com Github");
    const spy = jest.spyOn(authServiceStub, "authenticateGithub")

    await act(async () => {
      fireEvent.press(button);
    });
    expect(spy).toBeCalledWith({
      code: "1234",
      client_id: "client_id",
      client_secret: "client_secret"
    })
  });

  it("Should not login if authenticate with git returns undefined", async () => {
    const localStorageStub = new LocalStorageRepositoryStub();
    const authServiceStub = new AuthServiceStub();

    jest
      .spyOn(authServiceStub, "authenticateGithub")
      .mockImplementation(() => Promise.resolve(undefined));
    const { findByText } = render(
      renderComponent(localStorageStub, authServiceStub)
    );

    // login
    const button = await findByText("Entrar com Github");
    await act(async () => {
      fireEvent.press(button);
    })

    expect(await findByText("Erro ao logar com o git.")).toBeTruthy()
  });

  it("Should not login if authenticate with git throws an error", async () => {
    const localStorageStub = new LocalStorageRepositoryStub();
    const authServiceStub = new AuthServiceStub();

    jest
      .spyOn(authServiceStub, "authenticateGithub")
      .mockImplementation(() => Promise.reject(new Error("some error")));
    const { findByTestId, findByText } = render(
      renderComponent(localStorageStub, authServiceStub)
    );

    // login
    const button = await findByText("Entrar com Github");
    await act(async () => {
      fireEvent.press(button);
    })
    expect(await findByText("Erro ao logar com o git.")).toBeTruthy()
  });
});
