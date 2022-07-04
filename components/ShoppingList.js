import React, { useState, useEffect }  from 'react';

import { View, Button,FlatList, StyleSheet,Text, TextInput,ScrollView,TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {useValue} from './ValueStorageContext';

const ShoppingList = () => {
    const [list,setList] = useState([]);
    const [Item,setItem] = useState("");

    useEffect(() => {getData()},[])

    const getList = async () => {
      try{
          let userid = currentValue.userid
          let result = await Axios.post(appURL+'/shopping', {userid:userid})
          let list = result.data
        await AsyncStorage.setItem(
          '@List',
          JSON.stringify({...currentValue,list}))
          setList(list)
        }catch(e){
          console.log('error'+e)
          console.dir(e)

        }
    }

    const newItem = async (item) => {
      let userid = currentValue.userid
      const url = currentValue.appURL
      const response = 
      await Axios.post(url+"/cloud/addlist",
                          {item:item,
                            id:userid
                          });
      console.dir(response.data);
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
    <View style={styles.member_item}>
      <Text style={{fontSize:16, fontWeight: 'bold',}}>{item.Item}</Text>
    </View>
    );
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
         list is {JSON.stringify(list)}
      </Text>
  </View>);

return(

    <ScrollView style = {styles.container}>
        {getList()}
        <Text style = {{fontSize:30,fontWeight:'bold', alignSelf: 'center'}}>ShoppingList</Text>
        <Text style = {{alignSelf: 'center'}}> Add items for next shopping</Text>
        <View style = {styles.wordbox}>
            <Text style = {{fontSize:16,fontWeight:'bold', alignSelf: 'flex-start', marginLeft: 20, padding:10}}>Add new Item</Text>
            <TextInput
                style={styles.input}
                onChangeText={newText => setItem(newText)}
                value={Item}
                placeholder="enter new Item"
            />
            <View style = {{flexDirection: 'row', alignItems: 'center',alignSelf: 'center'}}>
                <Button
                title={"Add Item"}
                color = '#628FA6'
                onPress = {() => 
                {
                        newItem(Item)
                        getList()
                        setItem("")
                }}
                />
                <Button
                    title={"Clear List"}
                    color = '#D78873'
                    onPress = {() => {
                        clearAll()
                        setList([])
                        setItem("")
                    }}
                />
            </View>
            
        </View>
        
        <View style = {styles.paragraph}>
            <FlatList
                data = {list}
                renderItem={renderItem}
                keyExtractor={item => item.Item}
            />
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
      height: 30,
      margin: 12,
      borderWidth: 1,
      borderRadius: 5,
    },
    wordbox:{
        flexDirection:"column",
        alignSelf: 'stretch',
        marginLeft: 20,
        marginRight: 20,
        marginTop: 15,
        marginBottom: 15,
        backgroundColor: '#fff',
      },
    paragraph: {
      marginLeft: 20,
      marginRight: 20,
      marginTop: 15,
      marginBottom: 15,
      padding:20,
      borderWidth: 4,
      borderRadius: 5,
      borderColor: '#628FA6',
      alignSlef: "center",
      },
  });

  export default ShoppingList;