import React from "react";
import { Navigation } from "@ui/src/navigation";
import { render, fireEvent } from "@testing-library/react-native";
import { AuthUseCase, Credentials } from "@domain/entities/usecases";
import { User } from "@domain/entities/models";
import { LocalStorageRepository } from "@domain/repositories";
import { AuthContextProvider } from "@ui/src/context";
import { act } from "react-test-renderer";
import { AuthPromptService } from "@ui/src/hooks";
export {} from "@react-native-async-storage/async-storage/jest/async-storage-mock";

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
  async setItem(key: string, data: any): Promise<void> {}
  async removeItem(key: string): Promise<void> {}
}

const authPromptServiceStub: AuthPromptService = {
  promptAuth: async () => {
    return { code: "1234" };
  },
};

const renderComponent = (
  localStorageStub: LocalStorageRepository,
  authServiceStub: AuthUseCase
) => {
  return (
    <AuthContextProvider
      authPromptService={authPromptServiceStub}
      authService={authServiceStub}
      localStorageRepository={localStorageStub}
    >
      <Navigation />
    </AuthContextProvider>
  );
};

describe("Authentication", () => {
  it("Should redirect after authenticate", async () => {
    const localStorageStub = new LocalStorageRepositoryStub();
    const authServiceStub = new AuthServiceStub();
    const { findByTestId, findByText } = render(
      renderComponent(localStorageStub, authServiceStub)
    );

    const button = await findByText("Entrar com Github");
    await act(async () => {
      fireEvent.press(button);
    });
    const homeScreen = await findByTestId("home_screen");

    expect(homeScreen).toBeTruthy();
  });

  it("Should logout sucessfully", async () => {
    const localStorageStub = new LocalStorageRepositoryStub();
    const authServiceStub = new AuthServiceStub();
    const { findByTestId, findByText } = render(
      renderComponent(localStorageStub, authServiceStub)
    );

    // login
    const loginButton = await findByText("Entrar com Github");
    await act(async () => {
      fireEvent.press(loginButton);
    });

    // logout
    const logoutButton = await findByText("Logout");
    await act(async () => {
      fireEvent.press(logoutButton);
    });

    expect(await findByTestId("auth_screen")).toBeTruthy();
  });

  it("Should not login if authenticate with git returns undefined", async () => {
    const localStorageStub = new LocalStorageRepositoryStub();
    const authServiceStub = new AuthServiceStub();

    jest
      .spyOn(authServiceStub, "authenticateGithub")
      .mockImplementation(() => Promise.resolve(undefined));
    const { findByTestId, findByText } = render(
      renderComponent(localStorageStub, authServiceStub)
    );

    // login
    const button = await findByText("Entrar com Github");
    await act(async () => {
      fireEvent.press(button);
    });

    expect(await findByTestId("auth_screen")).toBeTruthy();
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
    });

    expect(await findByTestId("auth_screen")).toBeTruthy();
  });
});
