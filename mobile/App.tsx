import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';
import { NativeBaseProvider } from 'native-base';
import { StatusBar } from 'expo-status-bar';
import { Loading } from '@/components/Loading';

import { AuthContextProvider } from '@/contexts/AuthContext';

import { THEME } from '@/theme';
import { Routes } from '@/routes';
 
export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  })

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar 
        style='light'
        backgroundColor='transparent'
        translucent
      />   
      <AuthContextProvider>
        {fontsLoaded ? <Routes /> : <Loading />}
      </AuthContextProvider>
    </NativeBaseProvider>
  );
}