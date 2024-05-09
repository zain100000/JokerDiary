import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Splash from './src/components/screens/Splash';
import DrawerNavigator from './src/components/navigation/DrawerNavigator';
import QuoteScreen from './src/components/otherComponents/quote/QuoteScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Home" component={DrawerNavigator} />
        <Stack.Screen name="QuoteScreen" component={QuoteScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
