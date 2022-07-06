/*
  Page to edit your name and email ...
*/



import React,{useState} from 'react';
import {View,Text,TextInput,Button, StyleSheet, ScrollView,Alert} from 'react-native';
import {useValue} from './ValueStorageContext';

const Profile = () => {
    const {currentValue,setCurrentValue} = useValue();
    const [name,setName] = useState("Someone");
    const [avatar,setAvatar] = useState("https://media.istockphoto.com/vectors/cute-ghost-icon-silhouette-vector-id859891056?k=6&m=859891056&s=612x612&w=0&h=2_phi-weg0t0lJYULtwsaLBbQe8U57GaeVRKyqSO5Hw=");
    
    const message = () =>
      Alert.alert(
      "",
      "Profile Saved!",
      [
      {
          text: "Okay",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
      },
      ]
  );

    return (
      <ScrollView style = {styles.wordbox}>
        <View style = {styles.title_badge}>
          <Text style = {{fontSize: 24, fontWeight: 'bold'}} > Login as:</Text>
          <Text style = {{fontSize: 18, fontWeight: 'bold'}} > {currentValue.name}</Text>
        </View>
        <View style = {styles.container}>
          <View style={{flexDirection: 'column', alignSelf: 'stretch'}}>
              <Text style = {styles.title_name}> What you can to be called? </Text>
              <TextInput
                style={styles.input}
                placeholder="name"
                onChangeText={newText => setName(newText)}
                defaultValue={""}
              />
          </View>
          <View style={{flexDirection: 'columnw', alignSelf: 'stretch'}}>
          <Text style = {styles.title_name}> Set your homepage avatar: </Text>
          <TextInput
            style={styles.input}
            placeholder="image link"
            onChangeText={newText => setAvatar(newText)}
            defaultValue={""}
          />
            </View>
        </View>
        <Button 
              title="Save profile info"
              Color="#f194ff"
              onPress = {() => {
                setCurrentValue({name,avatar});
                console.log(JSON.stringify(currentValue))
                message();
              }}
              />
      </ScrollView>
    )
}

const styles = StyleSheet.create({
  container: {
    flexDirection:"column",
    paddingTop: 10,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    alignSelf: 'stretch',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    marginBottom: 20,
    justifyContent: 'space-around',
  },
  title_badge:{
    backgroundColor:'rgb(248, 228, 204)',
    alignSelf: 'stretch',
    alignItems: 'center',
    fontSize: 24, fontWeight: 'bold'
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


export default Profile;