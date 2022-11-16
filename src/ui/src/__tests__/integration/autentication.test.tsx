import React from 'react';
import { Navigation } from '../../navigation';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { AuthUseCase, Credentials } from '@domain/entities/usecases';
import { User } from '@domain/entities/models';
import { LocalStorageRepository } from '@domain/repositories';
import { AuthContextProvider } from '@ui/src/context';
import { AuthPromptService } from '@ui/src/hooks';
import { act } from 'react-test-renderer';

class AuthServiceStub implements AuthUseCase {
  async authenticateGithub (credentials: Credentials): Promise<User| undefined>{
    return Promise.resolve({
      email: "test@test.com", 
      id: "123", 
      username: "test", 
      photoUrl: "photo_url", 
      techs: ['tech1', 'tech2', 'tech3']
    })
  } 
}

class LocalStorageRepositoryStub  implements LocalStorageRepository {
   async getItem<T>(key: string): Promise<T | undefined> {
    return Promise.resolve({} as T)
  }
  async setItem(key: string, data: any): Promise<void> {}
  async removeItem(key: string): Promise<void> {}
}

const authPromptServiceStub: AuthPromptService = {
  promptAuth: async () => {
    return { code: '1234' }
  }
}

const renderComponent = () => {
  const localStorageStub = new LocalStorageRepositoryStub()
  const authServiceStub = new AuthServiceStub()

  return( 
    <AuthContextProvider 
      authPromptService={authPromptServiceStub}
      authService={authServiceStub} 
      localStorageRepository={localStorageStub}
    >
      <Navigation />
    </AuthContextProvider>
  )
}


describe('Authentication', () => {
  it('Should redirect after authenticate', async () => {
    await render(renderComponent())
    const button = await screen.getByText("Entrar com Github")
    await act(async () => {
      fireEvent.press(button);
    })
    const logoutButton = await screen.getByText("Logout")

    expect(logoutButton).toBeTruthy()
  });

  it('Should logout sucessfully', async () => {
    await render(renderComponent())

    // login
    const button = await screen.getByText("Entrar com Github")
    await act(async () => {
      fireEvent.press(button);
    })

     // logout
    const logoutButton = await screen.getByText("Logout")    
    await act(async () => {
      fireEvent.press(logoutButton);
    })

    expect(await screen.getByText("Bem vindo ao DevChat!")).toBeTruthy()
  });

});