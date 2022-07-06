import { Text, Button,View,StyleSheet,TextInput,Alert} from 'react-native'
import React, { useState, useEffect }  from 'react';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'


    

const Timer = () => {
    const [isPlaying, setIsPlaying] = useState(false)
    const [selectedHours, setselectedHours] = useState(0)
    const [selectedMinutes, setselectedMinutes] = useState(0)
    const [selectedSeconds, setselectedSeconds] = useState(0)

    const message = () =>
        Alert.alert(
        "",
        "Task Completed!",
        [
        {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
        },
        { text: "OK", onPress: () => console.log("OK Pressed") }
        ]
    );

    
    return(
        <View style = {styles.container}>
            <View style = {{flexDirection:"column"}}>
                <View style = {{flexDirection:"row",justifyContent: 'space-around',alignSelf: 'stretch',}}>
                    <Text>Hours</Text>
                    <Text>Minutes</Text>
                    <Text>Seconds</Text>
                </View>
                <View style = {styles.wordbox}>
                    <TextInput
                        style={styles.input}
                        placeholder="0h"
                        onChangeText={newText => setselectedHours(newText)}
                        defaultValue={0}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="0m"
                        onChangeText={newText => setselectedMinutes(newText)}
                        defaultValue={0}
                    />
                                    <TextInput
                        style={styles.input}
                        placeholder="0s"
                        onChangeText={newText => setselectedSeconds(newText)}
                        defaultValue={0}
                    />
                </View>
            </View>
            <View style = {{flexDirection: 'row',alignSelf: 'stretch', justifyContent: 'center',}}>
                
            <CountdownCircleTimer
                    isPlaying={isPlaying}
                    size = {300}
                    strokeWidth = {20}
                    duration={selectedHours*3600 + selectedMinutes*60 + selectedSeconds*1}
                    colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
                    colorsTime={[10, 6, 3, 0]}
                    onComplete={() => {
                        message();
                        return { shouldRepeat: true} // repeat animation in 1.5 seconds
                    }}
                >
                {({ remainingTime, color }) => (
                    <Text style={{ color, fontSize: 40 }}>{(remainingTime/3600)|0}:{(remainingTime%3600/60)|0}:{(remainingTime%60)|0}</Text>
                )}
            </CountdownCircleTimer>
            </View>
            <View style = {styles.wordbox}>
            <Button title="Toggle Playing" onPress={() => setIsPlaying(prev => !prev)} />
            </View>     
        </View>
        )
    }
    const styles = StyleSheet.create({
        container: {
        flex: 1,
          flexDirection: 'column',
          alignSelf:'stretch',
          justifyContent: 'space-between',
          marginVertical: 25,
          marginHorizontal: 16,
        },
         input: {
            flex:1,
          height: 50,
          margin: 5,
          borderWidth: 1,
          borderRadius: 5,
        },
        wordbox:{
            flexDirection:"row",
            justifyContent: 'space-around',
            alignSelf: 'stretch',
            marginBottom: 30,
            padding:20,
          },

      });

export default Timer

