import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AddQuotes from '../screens/AddQuotes';
import QuotesLists from '../screens/QuotesLists';
import ContactForm from '../screens/ContactForm';

const Tab = createMaterialBottomTabNavigator();

const BottomNavigator = () => {
  return (

    <Tab.Navigator activeColor="#e91e63" barStyle={{backgroundColor: '#000'}}>
      
      <Tab.Screen
        name="Add Quotes"
        component={AddQuotes}
        options={{
          tabBarLabel: 'Add Quotes',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="plus-circle"
              color={color}
              size={26}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Quotes Lists"
        component={QuotesLists}
        options={{
          tabBarLabel: 'Quotes Lists',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="format-list-bulleted"
              color={color}
              size={26}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Contact"
        component={ContactForm}
        options={{
          tabBarLabel: 'Contact',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigator;
