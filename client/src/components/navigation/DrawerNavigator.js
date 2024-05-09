import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomDrawer from '../consts/CustomDrawer';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import COLORS from '../consts/Colors';
import Home from '../screens/Home';
import Contact from '../screens/Contact';
import PrivacyPolicy from '../screens/PrivacyPolicy';
import LatestQuotes from '../screens/LatestQuotes';
import QuoteOfTheDay from '../screens/QuoteOfDay';
import LikedQuotes from '../screens/LikedQuotes';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        drawerActiveBackgroundColor: COLORS.dark,
        drawerActiveTintColor: '#fff',
        headerTitle: "Joker's Diary Quotes",
      }}>
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{
          drawerIcon: ({color}) => (
            <MaterialCommunityIcons
              name="home-outline"
              size={22}
              color={color}
            />
          ),
          drawerLabelStyle: {marginLeft: -20, fontWeight: '700', fontSize: 16},

          headerStyle: {
            height: 80,
            backgroundColor: COLORS.white,
          },
          headerTitleStyle: {fontSize: 25, fontWeight: '600'},
        }}
      />

      <Drawer.Screen
        name="Liked Quotes"
        component={LikedQuotes}
        options={{
          drawerIcon: ({color}) => (
            <MaterialCommunityIcons
              name="heart-outline"
              size={22}
              color={color}
            />
          ),
          drawerLabelStyle: {marginLeft: -20, fontWeight: '700', fontSize: 16},

          headerStyle: {
            height: 80,
            backgroundColor: COLORS.white,
          },
          headerTitleStyle: {fontSize: 25, fontWeight: '600'},
        }}
      />

      <Drawer.Screen
        name="Quote Of The Day"
        component={QuoteOfTheDay}
        options={{
          drawerIcon: ({color}) => (
            <MaterialCommunityIcons
              name="comment-quote-outline"
              size={22}
              color={color}
            />
          ),
          drawerLabelStyle: {marginLeft: -20, fontWeight: '700', fontSize: 16},

          headerStyle: {
            height: 80,
            backgroundColor: COLORS.white,
          },
          headerTitleStyle: {fontSize: 25, fontWeight: '600'},
        }}
      />

      <Drawer.Screen
        name="Latest Quotes"
        component={LatestQuotes}
        options={{
          drawerIcon: ({color}) => (
            <MaterialCommunityIcons name="autorenew" size={22} color={color} />
          ),
          drawerLabelStyle: {marginLeft: -20, fontWeight: '700', fontSize: 16},

          headerStyle: {
            height: 80,
            backgroundColor: COLORS.white,
          },
          headerTitleStyle: {fontSize: 25, fontWeight: '600'},
        }}
      />

      <Drawer.Screen
        name="Contact Us"
        component={Contact}
        options={{
          drawerIcon: ({color}) => (
            <MaterialCommunityIcons
              name="email-outline"
              size={22}
              color={color}
            />
          ),
          drawerLabelStyle: {marginLeft: -20, fontWeight: '700', fontSize: 16},

          headerStyle: {
            height: 80,
            backgroundColor: COLORS.white,
          },
          headerTitleStyle: {fontSize: 25, fontWeight: '600'},
        }}
      />

      <Drawer.Screen
        name="Privacy Policy"
        component={PrivacyPolicy}
        options={{
          drawerIcon: ({color}) => (
            <MaterialCommunityIcons
              name="sticker-check-outline"
              size={22}
              color={color}
            />
          ),
          drawerLabelStyle: {marginLeft: -20, fontWeight: '700', fontSize: 16},

          headerStyle: {
            height: 80,
            backgroundColor: COLORS.white,
          },
          headerTitleStyle: {fontSize: 30, fontWeight: 'bold'},
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
