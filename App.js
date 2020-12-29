import React from 'react';
import Main from './src/components/Main';
import { NativeRouter } from 'react-router-native';
import { ApolloProvider } from '@apollo/react-hooks';
import createApolloClient from './src/utils/apolloClient';
import AuthStorage from './src/utils/authStorage';
import AuthStorageContext from './src/contexts/AuthStorageContext';
import { useFonts, Roboto_400Regular } from '@expo-google-fonts/roboto';

const authStorage = new AuthStorage();
const apolloClient = createApolloClient(authStorage);

const App = () => {
  const [fontsLoaded] = useFonts({
    Roboto: Roboto_400Regular,
  });

  return (
    <NativeRouter>
      <ApolloProvider client={apolloClient}>
        <AuthStorageContext.Provider value={authStorage}>
          {fontsLoaded && <Main />}
        </AuthStorageContext.Provider>
      </ApolloProvider>
    </NativeRouter>
  );
};

export default App;