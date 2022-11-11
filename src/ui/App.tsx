import "@ui/src/config/firabaseConfig"; 
import { AuthContextProvider } from '@ui/src/context';
import { AuthPage } from '@ui/src/pages';
import { View } from 'react-native'

export default function App() {

  return (
    <AuthContextProvider>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <AuthPage />
      </View>
    </AuthContextProvider>
  );
}

