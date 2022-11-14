import "@ui/src/config/firabaseConfig"; 
import { AuthContextProvider } from '@ui/src/context';
import { FirebaseDatabaseRepository, HttpRepositoryImp, LocalStorage } from "@infrastructure/repositories"
import {  AuthService } from "@domain/services"
import { FIREBASE_COLLECTION, GITHUB_URL } from "./src/constants";
import { Navigation } from "@ui/src/navigation"
import { useCustomFonts } from "./src/hooks";

export default function App() {
  const [isFontLoaded] = useCustomFonts()

  const gitAuthHttp = new HttpRepositoryImp(GITHUB_URL.AUTH_BASE_URL)
  const gitApiHttp = new HttpRepositoryImp(GITHUB_URL.API_BASE_URL)
  const userDbRepository = new FirebaseDatabaseRepository(FIREBASE_COLLECTION.USERS)
  const authService = new AuthService(gitAuthHttp, gitApiHttp, userDbRepository)
  const localStorageRepository = new LocalStorage()

  if(!isFontLoaded) return

  return (
    <AuthContextProvider 
      authService={ authService }
      localStorageRepository={localStorageRepository}
    >
        <Navigation />
    </AuthContextProvider>
  );
}

