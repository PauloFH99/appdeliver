import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { AuthProvider } from './contexts/auth';
import { StatusBar } from 'react-native'
import Routes from './routes';

const App: React.FC = () => {
  return (
    <NavigationContainer>
     
      <AuthProvider>
        <StatusBar backgroundColor="transparent" translucent barStyle="dark-content" />
        <Routes />
      </AuthProvider>
    </NavigationContainer>
  );
};

export default App;
