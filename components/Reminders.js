import React, { useState, useEffect }  from 'react';

import { View, Button,FlatList, StyleSheet,Text, TextInput,ScrollView,TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DropDownPicker from 'react-native-dropdown-picker';
import { Icon } from 'react-native-elements'


const ShoppingList = () => {
    const [list,setList] = useState([]);
    const [open, setOpen] = useState(false);
    const [task, setTask] = useState(null);
    const [choose, setChoose] = useState("1");
    const [priority, setPriority] = useState([
    {label: 'Later', value: '1',},
    {label: 'Current', value: '2',},
    {label: 'Urgent', value: '3',},
   {label: 'Emergency', value: '4'},
  ]);

    useEffect(() => {getData()},[])
    const conditional = (keyword) => {
        if (keyword == '1'){
            return styles.later
        }
        else if (keyword == '2'){
            return styles.current
        }
        else if (keyword == '3'){
            return styles.urgent
        }
        else if (keyword == '4'){
            return styles.emergency
        }
    }
    const getData = async () => {
        try {
          // the '@profile_info' can be any string
          const jsonValue = await AsyncStorage.getItem('@remind')
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

  const removeItem = async (item) => {
    try {
      const removename= item.task
      const jsonValue = await AsyncStorage.getItem('@remind')
      var data = JSON.parse(jsonValue)
      function RemoveNode(name) {
        return data.filter(function(emp) {
            if (emp.task == name) {
                return false;
            }
            return true;
        });
    }
    var newData = RemoveNode(removename);
    const newjs = JSON.stringify(newData)
    await AsyncStorage.setItem('@remind', newjs)
    setList(newData)
    setItem("")
    } catch (e) {
      console.log("error in storeData ")
      console.dir(e)
      // saving error
    }
}

  const storeData = async (value) => {
        try {
          const jsonValue = JSON.stringify(value)
          await AsyncStorage.setItem('@remind', jsonValue)
          console.log('just stored '+jsonValue)
        } catch (e) {
          console.log("error in storeData ")
          console.dir(e)
          // saving error
        }
  }


  const clearAll = async () => {
        try {
          console.log('in clearData')
          await AsyncStorage.clear()
        } catch(e) {
          console.log("error in clearData ")
          console.dir(e)
          // clear error
        }
  }

  const Sorting = async () =>{
    try {
        var newItem = list
        newItem.sort((firstItem, secondItem) => secondItem.priority - firstItem.priority)
        setList(newItem)
        const newjs = JSON.stringify(newItem)
        await AsyncStorage.setItem('@remind', newjs)
    } catch(e) {
      console.log("error in clearData ")
      console.dir(e)
      // clear error
    }
  }

  const renderItem = ({ item }) => {
    return (
    <View style={conditional(item.priority)}>
      <Text style={{fontSize:16, fontWeight: 'bold',}}>{item.task}</Text>
      <TouchableOpacity
          onPress={() => removeItem(item)}
        >
        <Icon
          name="delete"
          color="black"
          size={20}
      />
      </TouchableOpacity>
    </View>
    
    );
  };

  const sort = () => {
    var newItem = list
    newItem.sort((firstItem, secondItem) => firstItem.priority - secondItem.priority)
    setList(newItem)
  }

  let debug=false
  const debugView =
    (<View>
      <Text>
        DEBUGGING INFO
      </Text>
      <Text>
         Item is ({task})
      </Text>
      <Text>
         list is {JSON.stringify(list)}
      </Text>
  </View>);

return(

    <ScrollView style = {styles.container}>
        <Text style = {{fontSize:30,fontWeight:'bold', alignSelf: 'center'}}>Reminders</Text>
        <Text style = {{alignSelf: 'center'}}> Add item</Text>
        <View style = {styles.wordbox}>
            <Text style = {{fontSize:16,fontWeight:'bold', alignSelf: 'flex-start', marginLeft: 20, padding:10}}>Add new Item</Text>
            <TextInput
                    style={styles.input}
                    onChangeText={newText => setTask(newText)}
                    value={task}
                    placeholder="enter new Item"
                />
            <DropDownPicker
                label = "Priority"
                open={open}
                value={choose}
                items={priority}
                setOpen={setOpen}
                setValue={setChoose}
                setItems={setPriority}
                selectedItemLabelStyle={{
                    fontWeight: "bold",
                    backgroundColor: 'aliceblue'
                    }}
                hideSelectedItemIcon={true}
                placeholder="Priority of the task"
                zIndex={100}
            />
            <View style = {{flexDirection: 'row', alignItems: 'center',alignSelf: 'center'}}>
                <Button
                title={"Add Item"}
                color = '#628FA6'
                onPress = {() => 
                {
                    const newItem =
                        list.concat({'task':task, 'priority': choose})
                    setList(newItem)
                    storeData(newItem)
                    setChoose("1")
                    setTask("")
                }}
                />
                <Button
                    title={"Clear List"}
                    color = '#D78873'
                    onPress = {() => {
                        clearAll()
                        setList([])
                        setChoose("1")
                        setTask("")
                    }}
                />
                <Button
                    title={"Save"}
                    color = '#D78873'
                    onPress = {() => {
                        Sorting()
                    }}
                />
            </View>
            <View style = {styles.paragraph}>
                <FlatList
                    data = {list}
                    renderItem={renderItem}
                    keyExtractor={item => item.task}
                />
            </View>
        </View>

        
        {debug?debugView: <Text></Text>}
    </ScrollView>

);    
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    marginVertical: 25,
    marginHorizontal: 16,
  },
  member_item: {
      padding: 10,
      felx: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: 8,
      marginHorizontal: 5,
      borderBottomWidth: 2,
      borderColor: '#628FA6',
  },
  member_title: {
      fontSize: 14,
      fontWeight: 'bold',
  },
   input: {
    height: 50,
    margin: 5,
    borderWidth: 1,
    borderRadius: 5,
  },
  wordbox:{
      flexDirection:"column",
      alignSelf: 'stretch',
      marginTop: 15,
      marginBottom: 30,
      padding:20,
      backgroundColor: '#fff',
    },
  paragraph: {

    marginTop: 15,
    marginBottom: 15,
    padding:20,
    borderWidth: 4,
    borderRadius: 5,
    borderColor: '#628FA6',
    alignSlef: "center",
    },
    roundButton2: {
      width: 20,
      height: 20,
      fontWeight: 'bold',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 1,
      borderRadius: 100,
      backgroundColor: '#D78873',
    },
    later:{
        padding: 10,
        felx: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 8,
        marginHorizontal: 5,
        borderBottomWidth: 2,
        backgroundColor: '#fff',
        borderColor: 'black',
        shadowColor: "darkgray",
    },
    current:{
        padding: 10,
        felx: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 8,
        marginHorizontal: 5,
        borderBottomWidth: 2,
        backgroundColor: '#fff8dc',
        borderColor: 'black',
        shadowColor: "darkgray",
    },
    urgent:{
        padding: 10,
        felx: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 8,
        marginHorizontal: 5,
        borderBottomWidth: 2,
        backgroundColor: 'lightsalmon',
        borderColor: 'black',
        shadowColor: "darkgray",
    },
    emergency:{
        padding: 10,
        felx: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 8,
        marginHorizontal: 5,
        borderBottomWidth: 2,
        backgroundColor: 'tomato',
        borderColor: 'black',
        shadowColor: "darkgray",
    },
});

  export default ShoppingList; 