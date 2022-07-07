import React, { useState, useEffect } from 'react';
import { Button, Text, View, StyleSheet, ScrollView,Modal,TextInput,Pressable,FlatList,TouchableOpacity} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {useValue} from './ValueStorageContext';
import { Avatar } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { DatePickerModal } from 'react-native-paper-dates';
import { Icon } from 'react-native-elements'


import ProfileScreen from './Profile';
import MealSearch from './meals';
import ShoppingList from './ShoppingList';
import Reminders from './Reminders';
import money from './money';
import Timer from './Timer';

// access the profile info from this page ...
function HomeScreen({ navigation }) {
  const {currentValue,setCurrentValue} = useValue();
  const [date, setDate] = useState(new Date())
  const [list,setList] = useState([]);
  const [Item,setItem] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [open, setOpen] = useState(true);

  useEffect(() => {getData()},[])

  const getData = async () => {
      try {
        // the '@profile_info' can be any string
        const jsonValue = await AsyncStorage.getItem('@memorydays')
        let data = null
        if (jsonValue!=null) {
          data = JSON.parse(jsonValue)
          setList(data)
          console.log('just read existing list')
        } else {
          console.log('just read a null value from Storage')
          setList([])
          setItem("")
        }
      } catch(e) {
        console.log("error in getData ")
        console.dir(e)
      }
}


const storeData = async (value) => {
      try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem('@memorydays', jsonValue)
        console.log('just stored '+jsonValue)
      } catch (e) {
        console.log("error in storeData ")
        console.dir(e)
        // saving error
      }
}

const removeItem = async (item) => {
  try {
    const removename= item.Item
    const jsonValue = await AsyncStorage.getItem('@memorydays')
    var data = JSON.parse(jsonValue)
    function RemoveNode(name) {
      return data.filter(function(emp) {
          if (emp.Item == name) {
              return false;
          }
          return true;
      });
  }
    var newData = RemoveNode(removename);
    const newjs = JSON.stringify(newData)
    await AsyncStorage.setItem('@memorydays', newjs)
    setList(newData)
    setItem("")
  } catch (e) {
    console.log("error in storeData ")
    console.dir(e)
    // saving error
  }
}

  const renderItem = ({ item }) => {
    return (
    <View style={styles.member_item}>
      <View style = {{alignSelf: 'stretch',alignItems: 'center',flexDirection: 'row',justifyContent:'space-between',marginHorizontal:10}}>
        <Text style={{fontSize:20, fontWeight: 'bold',}}>{item.Item}</Text>
        <TouchableOpacity
            onPress={() => removeItem(item)}
          >
          <Icon
            name="delete"
            color="tomato"
            size={20}
        />
        </TouchableOpacity>
      </View>
      <View style = {{alignSelf: 'stretch',alignItems: 'center', marginTop:3,  borderTopWidth: 2,borderRadius: 15,borderColor: 'powderblue',}}>
        <View style = {{marginVertical:15}}>
          <Text style={{fontSize:25}}>{moment(item.date).fromNow(true)}</Text>
        </View>
      </View>
    </View>
    
    );
  };

const onDismissSingle = React.useCallback(() => {
  setOpen(false);
}, [setOpen]);

const openmodal = () => {
  setOpen(true)
  setModalVisible(true)
}

const onConfirmSingle = React.useCallback(
  (params) => {
    setOpen(false);
    setDate(params.date);
  },
  [setOpen, setDate]
);

  return (
    <ScrollView style = {styles.wordbox}>
      <View style = {styles.title_badge}>
        <Text style = {{fontSize: 24, fontWeight: 'bold'}} > Welcome Back, {currentValue.name}!</Text>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <Text style = {styles.member_title}>Add new event</Text>
          <TextInput
            style = {styles.input}
            onChangeText={newText => setItem(newText)}
            value={Item}
            placeholder="Name of the Event">
          </TextInput>
          <DatePickerModal
            locale="en"
            mode="single"
            visible={open}
            onDismiss={onDismissSingle}
            date={date}
            onConfirm={onConfirmSingle}
          />
         
          <View style = {{flexDirection:'row', justifyContent:'space-around', alignSelf:'stretch',paddingTop:20}}>
            <Pressable
              style={[styles.button]}
              onPress={() =>{
                const newItem =
                  list.concat({'Item':Item, 'date':date})
                  setList(newItem)
                  storeData(newItem)
                  setItem("")
                  setModalVisible(!modalVisible)
                }}
            >
              <Text style={styles.textStyle}>Confirm</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() =>
                setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Cancel</Text>
            </Pressable>
          </View>

          </View>
        </View>
      </Modal>
      <View style = {{ paddingTop:10,marginBottom:40, alignSelf: 'stretch', alignItems: 'center'}}>
        <View style = {{flexDirection:'row', alignItems: 'flex-end'}}>
          <Avatar 
            size = "xlarge"
            rounded
            source={{
              uri:
              currentValue.avatar,
            }}
          />
          <TouchableOpacity
            onPress={() => navigation.navigate('Profile')}
          >
            <Icon
              name="build"
              color="tomato"
              size={20}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style = {{flexDirection:'row'}}>
        <TouchableOpacity
          onPress={() => {openmodal()}}
        >
          <Icon
            name="create"
            color="tomato"
            size={20}
          />
        </TouchableOpacity>
        <Text style = {{  fontWeight: 'bold', fontSize: 16}}>Add new Event</Text>
      </View> 
      <FlatList
        data = {list}
        renderItem={renderItem}
        keyExtractor={item => item.Item}
      />
  </ScrollView>
  );
}

function ServiceScreen({ navigation }) {
  return (
    <ScrollView style = {styles.wordbox}>
    <View style = {styles.title_badge}>
      <Text style = {{fontSize: 24, fontWeight: 'bold',}} > Select you desired service</Text>
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
        title="Tally"
        backgroundColor = "floralwhite"
        color = 'rgb(21, 52, 80)'
        onPress={() => navigation.navigate('money')}
      />
    </View>
    <View style = {styles.container}>
      <Button
        title="Timer"
        backgroundColor = "floralwhite"
        color = 'rgb(21, 52, 80)'
        onPress={() => navigation.navigate('Timer')}
      />
    </View>
    <View style = {styles.container}>
    <Button
        title="Search for recepie"
        backgroundColor = "floralwhite"
        color = 'rgb(21, 52, 80)'
        onPress={() => navigation.navigate('MealSearch')}
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
      <ServiceStack.Screen name="Timer" component={Timer} 
      />
    </ServiceStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = 'person'
            } else if (route.name === 'Service') {
              iconName ="bookmarks";
            } else if (route.name === 'Profile') {
              iconName ='build';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}>
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
  baseText:{
    fontFamily: "Kanit"
  },
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
centeredView: {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  marginTop: 22
},
modalView: {
  margin: 20,
  backgroundColor: "white",
  borderRadius: 20,
  padding: 35,
  alignItems: "center",
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 2
  },
  shadowOpacity: 0.25,
  shadowRadius: 4,
  elevation: 5
},
member_item: {
  padding: 10,
  felx: 1,
  flexDirection: 'column',
  justifyContent: 'space-between',
  marginVertical: 8,
  marginHorizontal: 5,
  borderWidth: 2,
  borderRadius: 15,
  borderColor: 'palevioletred',
},
member_title: {
  fontSize: 24,
  fontWeight: 'bold',
},
input: {
  height: 50,
  margin: 5,
},
});
