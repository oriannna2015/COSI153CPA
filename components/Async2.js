import React from 'react';
import {View,Text,TextInput} from 'react-native';
import {useValue} from './ValueStorageContext';

const Async2 = () => {
    const {currentValue} = useValue();;

    return (
        <View>
            <Text> Age Calculator </Text>
            <Text> age in years: {currentValue.age} </Text>
            <Text> age in weeks: {currentValue.age * 52} </Text>
            <Text> age in days: {currentValue.age * 52 * 7} </Text>
        </View>
    )
}

export default Async2;