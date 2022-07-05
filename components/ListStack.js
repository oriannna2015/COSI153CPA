import * as React from 'react';
import { Button, Text, View, StyleSheet, ScrollView} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {useValue} from './ValueStorageContext';
import { Avatar } from 'react-native-elements';

import ProfileScreen from './Profile';
import MealSearch from './meals';
import ShoppingList from './ShoppingList';
import Reminders from './Reminders';
import money from './money';

// access the profile info from this page ...
function HomeScreen({ navigation }) {
  const {currentValue,setCurrentValue} = useValue();
  return (
    <ScrollView style = {styles.wordbox}>
      <View style = {styles.title_badge}>
        <Text style = {{fontSize: 24, fontWeight: 'bold'}} > Welcome Back, {currentValue.name}!</Text>
      </View>
      <View style = {{ paddingTop:10,paddingBottom:10, alignSelf: 'stretch', alignItems: 'center'}}>
        <Avatar 
          size = "xlarge"
          rounded
          source={{
            uri:
            currentValue.avatar,
          }}
        />
      </View>
      <View style = {styles.container}>
        <Button
            title="Edit Profile"
            color = 'rgb(21, 52, 80)'
            onPress={() => navigation.navigate('Profile')}
          />
      </View>
  </ScrollView>
  );
}

function ServiceScreen({ navigation }) {
  return (
    <ScrollView style = {styles.wordbox}>
    <View style = {styles.title_badge}>
      <Text style = {{fontSize: 24, fontWeight: 'bold'}} > Select you desired service</Text>
    </View>
    <View style = {styles.container}>
    <Button
        title="Search for recepie"
        backgroundColor = "floralwhite"
        color = 'rgb(21, 52, 80)'
        onPress={() => navigation.navigate('MealSearch')}
      />
    </View>
    <View style = {styles.container}>
      <Button
        title="Shopping List"
        backgroundColor = "floralwhite"
        color = 'rgb(21, 52, 80)'
        onPress={() => navigation.navigate('ShoppingList')}
      />
    </View>
    <View style = {styles.container}>
      <Button
        title="Reminders"
        backgroundColor = "floralwhite"
        color = 'rgb(21, 52, 80)'
        onPress={() => navigation.navigate('Reminders')}
      />
    </View>
    <View style = {styles.container}>
      <Button
        title="money"
        backgroundColor = "floralwhite"
        color = 'rgb(21, 52, 80)'
        onPress={() => navigation.navigate('money')}
      />
    </View>
  </ScrollView>
  );
}

const HomeStack = createNativeStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreen} 
         />
      <HomeStack.Screen name="Profile" component={ProfileScreen} 
         />
    </HomeStack.Navigator>
  );
}

const ServiceStack = createNativeStackNavigator();

function ServiceStackScreen() {
  return (
    <ServiceStack.Navigator>
      <ServiceStack.Screen name="Service" component={ServiceScreen} 
      />
      <ServiceStack.Screen name="MealSearch" component={MealSearch} 
      />
      <ServiceStack.Screen name="ShoppingList" component={ShoppingList} 
      />
      <ServiceStack.Screen name="Reminders" component={Reminders} 
      />
      <ServiceStack.Screen name="money" component={money} 
      />
    </ServiceStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeStackScreen} 
          options={{
            headerShown: false
        }}/>
        <Tab.Screen name="Service" component={ServiceStackScreen} 
        options={{
            headerShown: false
        }}/>
        <Tab.Screen name="Profile" component={ProfileScreen} 
        options={{
            headerShown: true
        }}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection:"row",
    backgroundColor: '#fff',
    borderColor: 'rgb(248, 228, 204)',
    borderRadius: 7,
    borderWidth: 7,
    alignItems: 'center',
    alignSelf: 'stretch',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    marginBottom: 10,
    justifyContent: 'space-around',
  },
  title_badge:{
    paddingTop:10,
    paddingBottom:10,
    backgroundColor:'rgb(143, 188, 219)',
    alignSelf: 'stretch',
    alignItems: 'center',
    fontWeight: 'bold'
  },
  title_name:{
    fontSize: 16,
    marginTop: 10,
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  wordbox:{
    flexDirection:"column",
    alignSelf: 'stretch',
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: '#fff',
  },
  paragraph: {
  marginLeft: 10,
  marginRight: 10,
  marginTop: 15,
  marginBottom: 15,
  fontSize: 18,
  textAlign: 'justify',
  alignSlef: "center",
  },
});

