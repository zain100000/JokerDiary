import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Splash from './src/components/screens/Splash';
import DrawerNavigator from './src/components/navigation/DrawerNavigator';
import QuoteScreen from './src/components/otherComponents/quote/QuoteScreen';
import RewardedAdComponent from './src/components/otherComponents/ads/RewardedAdComponent';
import OpenAppAdComponent from './src/components/otherComponents/ads/OpenAppAdComponent';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="OpenAppAd" component={OpenAppAdComponent} />
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="RewardedAd" component={RewardedAdComponent} />
        <Stack.Screen name="Joker's Diary" component={DrawerNavigator} />
        <Stack.Screen name="QuoteScreen" component={QuoteScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
