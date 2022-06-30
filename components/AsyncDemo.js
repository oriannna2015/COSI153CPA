import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import Async1Screen from './Async1';
import Async2Screen from './Async2';
import Async3Screen from './Async3';

const Tab = createBottomTabNavigator();

export default function App() {


  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Profile" component={Async1Screen} />
        <Tab.Screen name="Age" component={Async2Screen} />
        <Tab.Screen name="BMI" component={Async3Screen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

