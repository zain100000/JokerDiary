import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomNavigator from './src/components/navigation/BottomNavigator';
import UpdateQuote from './src/components/screens/UpdateQuote';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={BottomNavigator} />

        <Stack.Screen
          name="Update Quote"
          component={UpdateQuote}
          options={{headerShown: true}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
