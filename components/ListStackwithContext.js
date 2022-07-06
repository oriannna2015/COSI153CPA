
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import ListStack from './ListStack'

import React from "react";


import ValueProvider from './ValueStorageContext';




const Tab = createBottomTabNavigator();

const App = () => {
  const data =
    {name:"none",
     avatar:"https://media.istockphoto.com/vectors/cute-ghost-icon-silhouette-vector-id859891056?k=6&m=859891056&s=612x612&w=0&h=2_phi-weg0t0lJYULtwsaLBbQe8U57GaeVRKyqSO5Hw=",
    total: "0",
    }

  return (
    <ValueProvider value={data} tag = "@userinfo">
        <ListStack />
    </ValueProvider>
  )
}

export default App;