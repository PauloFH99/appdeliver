import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import SignIn from '../pages/SignIn';
import SignCad from '../pages/SignCad';
import Privacidade from '../pages/Privacidade';
import Adress from '../pages/Adreess';

const AuthStack = createStackNavigator();

const AuthRoutes: React.FC = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen name="Login" component={SignIn} />
    <AuthStack.Screen name="Cadastro" component={SignCad} />
    <AuthStack.Screen name="Endereços" component={Adress} />
    <AuthStack.Screen name="Políticas de  Privacidade" component={Privacidade} />
  </AuthStack.Navigator>
);

export default AuthRoutes;
