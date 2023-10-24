import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../pages/LoginScreen.js';
import MenuScreen from './TabMenu.js';

const Stack = createStackNavigator();

function Navigation() {
  const [userLoggedIn, setUserLoggedIn] = React.useState(false);

  const initialRouteName = userLoggedIn ? 'MenuScreen' : 'LoginScreen';

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRouteName}>
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="MenuScreen" component={MenuScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
