import React, {useState,useEffect} from 'react';
import {ScrollView,View,Text,TextInput,Button,FlatList} from 'react-native';
import {useValue} from './ValueStorageContext';
import {getUser,clearData} from './CloudData';
const Registration = () => {
    const {currentValue} = useValue();
    const [data,setData] = useState("null");
    const [user,setUser] = useState("");
    const [cleared,setCleared] = useState(false);
    const saveData = (result) => {
        console.dir(result);
        setData(result);
    }

    useEffect(()=>{getUser(saveData)},
            []);

    
    return (
        <View style={{flex:1}}>
            <TextInput 
               placeholder="username in web app"
               style={{height: 40, backgroundColor: 'white'}}
               onChangeText = {(text) => setUser(text)}
               value={user}
            />
            <Text>{user}</Text>
            <View style={{flexDirection:'row',justifyContent:'space-evenly'}}>
                <Button
                    title="Login"
                    onPress = {() =>
                        getUser(saveData, user)
                    } 
                />
            </View>
            

            <Text>result: {JSON.stringify(data)}</Text>
        </View> 
    )
}

export default Registration;

