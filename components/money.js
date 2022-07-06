import React, { useState, useEffect }  from 'react';

import { View, Button,FlatList, StyleSheet,Text, TextInput,ScrollView,TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DropDownPicker from 'react-native-dropdown-picker';
import { Icon } from 'react-native-elements'
import {useValue} from './ValueStorageContext';

const AccountBook = () => {
    const {currentValue,setCurrentValue} = useValue();
    const [list,setList] = useState([]);
    const [Item,setItem] = useState("");
    const [note,setNote] = useState("");
    const [total,setTotal] = useState(0);
    const [open, setOpen] = useState(false);
    const [choose, setChoose] = useState("cost");
    const [type, setType] = useState([
        {label: 'cost', value: 'cost',},
        {label: 'income', value: 'income',},
      ]);

    useEffect(() => {getData()},[])

    const conditional = (keyword) => {
        if (keyword == 'cost'){
            return styles.cost
        }
        else if (keyword == 'income'){
            return styles.income
        }
    }

    const getData = async () => {
        try {
          // the '@profile_info' can be any string
          const jsonValue = await AsyncStorage.getItem('@money')
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
      const removeamount= item.amount
      const removenote= item.note
      const removetype= item.type
      const jsonValue = await AsyncStorage.getItem('@money')
      var data = JSON.parse(jsonValue)
      function RemoveNode(note,amount,type) {
        return data.filter(function(emp) {
            if (emp.amount == amount && emp.note == note && emp.type == type) {
                return false;
            }
            return true;
        });
    }
    var newData = RemoveNode(removenote, removeamount, removetype);
    const newjs = JSON.stringify(newData)
    await AsyncStorage.setItem('@money', newjs)
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
          await AsyncStorage.setItem('@money', jsonValue)
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

  const renderItem = ({ item }) => {
    return (
    <View style={conditional(item.type)}>
        <Text>{item.type}</Text>
      <Text style={{fontSize:16, fontWeight: 'bold',}}>{item.amount}</Text>
      <TouchableOpacity
          onPress={() => removeItem(item)}
        >
        <Icon
          name="delete"
          color="#fff"
          size={20}
      />
      </TouchableOpacity>
    </View>
    );
  };

  const calc = async  () => {
    try {
        var totalamount = 0;
        var arrayLength = list.length;
    for (var i = 0; i < arrayLength; i++) {
        if (list[i].type == 'cost'){
            totalamount = totalamount - list[i].amount;
        }
        else{
            totalamount = totalamount + list[i].amount;
        }
        
        }
    setTotal(totalamount)
    const jsonValue = await AsyncStorage.getItem('@money')
    await AsyncStorage.setItem('@money', jsonValue)
      }
      catch(e) {
        console.log("error in clearData ")
        console.dir(e)
        // clear error
      }
  };


  let debug=false
  const debugView =
    (<View>
      <Text>
        DEBUGGING INFO
      </Text>
      <Text>
         Item is ({Item})
      </Text>
      <Text>
         total is ({total})
      </Text>
      <Text>
         list is {JSON.stringify(list)}
      </Text>
  </View>);

return(

    <ScrollView style = {styles.container}>
        <Text style = {{fontSize:30,fontWeight:'bold', alignSelf: 'center'}}>Account Book</Text>
        <Text style = {{alignSelf: 'center'}}> Record your income/cost</Text>
        <View style = {styles.wordbox}>
            <Text style = {{fontSize:16,fontWeight:'bold', alignSelf: 'flex-start', marginLeft: 20, padding:10}}>Add new record</Text>
            <TextInput
                style={styles.input}
                onChangeText={newText => setItem(newText)}
                value={Item}
                placeholder="Enter new Cost"
            />
            <TextInput
                style={styles.input}
                onChangeText={newText => setNote(newText)}
                value={note}
                placeholder="notes for the cost"
            />
            <DropDownPicker
                label = "MoneyType"
                open={open}
                value={choose}
                items={type}
                setOpen={setOpen}
                setValue={setChoose}
                setItems={setType}
                selectedItemLabelStyle={{
                    fontWeight: "bold",
                    backgroundColor: 'aliceblue'
                    }}
                hideSelectedItemIcon={true}
                placeholder="Choose type of the record"
                zIndex={100}
            />
            <View style = {{flexDirection: 'row', alignItems: 'center',alignSelf: 'center'}}>
                <Button
                title={"Add Record"}
                color = '#628FA6'
                onPress = {() => 
                {
                    const newItem =
                        list.concat({'amount': parseInt(Item), "note": note, "type":choose})
                        setList(newItem)
                        storeData(newItem)
                        calc()
                        setItem("")
                        setNote("")
                        setChoose("cost")
                }}
                />
                <Button
                    title={"Clear List"}
                    color = '#D78873'
                    onPress = {() => {
                        clearAll()
                        setList([])
                        setItem("")
                        setNote("")
                        setChoose("cost")
                        setTotal(0)
                    }}
                />
                <Button
                    title={"Get Total"}
                    color = '#D78873'
                    onPress = {() => {
                        calc()
                    }}
                />
            </View>
            <View style = {styles.paragraph}>
                <FlatList
                    data = {list}
                    renderItem={renderItem}
                    keyExtractor={item => item.Item}
                />
                <View style={{padding: 10,felx: 1,flexDirection: 'row',justifyContent: 'space-between',marginVertical: 8,marginHorizontal: 5,borderTopWidth: 5,borderColor: '#628FA6',}}>
                    <Text style={{fontSize:16, fontWeight: 'bold',}}>{total}</Text>
                </View>
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
      cost:{
          padding: 10,
          felx: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginVertical: 8,
          marginHorizontal: 5,
          borderBottomWidth: 2,
          backgroundColor: 'paleturquoise',
          borderColor: 'black',
          shadowColor: "darkgray",
      },
      income:{
          padding: 10,
          felx: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginVertical: 8,
          marginHorizontal: 5,
          borderBottomWidth: 2,
          backgroundColor: "pink",
          borderColor: 'black',
          shadowColor: "darkgray",
      },
  });

  export default AccountBook; 