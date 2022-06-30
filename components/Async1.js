import React,{useState} from 'react';
import {View,Text,TextInput,Button} from 'react-native';
import {useValue} from './ValueStorageContext'; // to use/change shared values

const Async1 = () => {
    const [name,setName] = useState("");
    const [age,setAge] = useState("");
    const [weight,setWeight] = useState("");
    const [height,setHeight] = useState("");
    const {currentValue,setCurrentValue} = useValue();
    const Value = Object.values(currentValue);
    return ( 
        <View>
            
            <Text> current value: {JSON.stringify(currentValue)} </Text>

        <View style={{flexDirection:'row', justifyContent: "space-around", alignSelf: 'stretch',}}>
                <View style={{flexDirection:'column', alignSelf: 'stretch', alignItems: "center", justifyContent: "space-around"}}>
                    <Text>name:</Text>
                
                    <Text>age</Text>
                
                    <Text>weight</Text>
                
                    <Text>height</Text>
                    
                </View>
                <View style={{flexDirection:'column', alignSelf: 'stretch', alignItems: "center", justifyContent: "space-between"}}>
                    <TextInput
                        style={{backgroundColor:'lightgreen'}}
                        onChangeText = {(text)=>setName(text)} 
                    />
                    <TextInput
                        style={{backgroundColor:'powderblue'}}
                        onChangeText = {(text)=>setAge(text)} 
                    />
                    <TextInput
                        style={{backgroundColor:'pink'}}
                        onChangeText = {(text)=>setWeight(text)} 
                    />
                    <TextInput
                        style={{backgroundColor:'aqua'}}
                        onChangeText = {(text)=>setHeight(text)} 
                    />
                </View>
            </View>
            
            <Button 
               title="SAVE PROFILE"
               onPress = {() => 
                    setCurrentValue({name: name, 
                                    age: age,
                                    weight: weight, height: height,})
                }
               />
            
        </View>
    )
}
export default Async1;