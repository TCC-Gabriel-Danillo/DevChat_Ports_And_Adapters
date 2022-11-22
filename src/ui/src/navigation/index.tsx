import { NavigationContainer } from '@react-navigation/native';
import { useAuth } from '../hooks';
import { LoadingScreen } from '../screens';
import { AuthNavigation } from './auth';
import { MainNavigation } from './main';


export function Navigation() {
  const { isAuthenticated, isAuthenticating } = useAuth()
  
    if(isAuthenticating) return <LoadingScreen />
    
    return (
      <NavigationContainer>
        {
          isAuthenticated ? <MainNavigation /> : <AuthNavigation/> 
        }
      </NavigationContainer>
    );
  }