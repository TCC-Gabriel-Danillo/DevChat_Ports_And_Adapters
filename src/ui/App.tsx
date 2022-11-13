import "@ui/src/config/firabaseConfig"; 
import { AuthContextProvider } from '@ui/src/context';
import { AuthPage } from '@ui/src/pages';
import { FirebaseDatabaseRepository, HttpRepositoryImp } from "@infrastructure/repositories"
import {  AuthService } from "@domain/services"
import { View } from 'react-native'
import { FIREBASE_COLLECTION, GITHUB_URL } from "./src/constants";

export default function App() {

  const gitAuthHttp = new HttpRepositoryImp(GITHUB_URL.AUTH_BASE_URL)
  const gitApiHttp = new HttpRepositoryImp(GITHUB_URL.API_BASE_URL)
  const userDbRepository = new FirebaseDatabaseRepository(FIREBASE_COLLECTION.USERS)
  const authService = new AuthService(gitAuthHttp, gitApiHttp, userDbRepository)

  return (
    <AuthContextProvider authService={ authService }>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <AuthPage />
      </View>
    </AuthContextProvider>
  );
}

