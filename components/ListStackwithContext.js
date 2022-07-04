
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import ListStack from './ListStack'

import React from "react";


import ValueProvider from './ValueStorageContext';




const Tab = createBottomTabNavigator();

const App = () => {
  const data =
    {username:"none",
     profilename:"",
     appURL: 'https://fathomless-shelf-49222.herokuapp.com',
     userid: "",
     avatar:"",
     userdata:null,
   }

  return (
    <ValueProvider value={data}>
        <ListStack />
    </ValueProvider>
  )
}

export default App;