import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, ScrollView, SafeAreaView} from 'react-native';
import Info_list from "./components/Info_list"

const Bio = () => {
<View style={styles.container}>
    <View style = {styles.title_badge}>
      <Text style = {styles.title_page} > Bio </Text>
    </View>
    <View>
      <Text style = {styles.title_name}> Oriana Chen </Text>
    </View>
    <View>
        <ImageBackground 
        source={{uri:"https://64.media.tumblr.com/cb9d946a145817cf9efacb1a67ba3cdb/ca8bb9a928e0efb2-9f/s500x750/dbb7f5f116f9470b4a2b73c926f4cb5ea2094942.jpg",}}
        resizeMode="stretch" style={styles.image}>
          <Text style={styles.image_text}>Cute Fox</Text>
        </ImageBackground>
    </View>
    <View>
      <Info_list/>
    </View>
    <View>
      <Text style = {styles.title_name}> What is this about? </Text>
    </View>
    <View style = {styles.wordbox}>
      <Text style = {styles.paragraph}> 
        This mobile App project is currentlty designed to serve for businesses such as small workshop for delivering services including info look up, reservations, user acount info lookup, announcement and advertising publishment as well as possoble charing and top up. 
      </Text>
      <Text style = {styles.paragraph}> 
        The inspiration for this app comes from the design project from my friend Owen, who is working on proposing a project for self-serving shared workspace in the community. Specific list of functions that will be deployed in the project will depend on the accquired modules from class, and the theme is still subjected to changes.
      </Text>
    </View>
  </View>
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  title_badge:{
    backgroundColor:'powderblue',
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  title_page:{
    fontSize: 36,
    fontWeight: 600,
  },
  title_name:{
    fontWeight: 500,
    fontSize: 32,
    marginTop: 10,
    marginBottom: 10,
    alignSelf: 'center',
  },
  image:{
    width: 300,
    height: 210,
    alignSelf: 'center',
  },
  image_text: {
  color: "white",
  fontSize: 24,
  lineHeight: 84,
  fontWeight: "bold",
  textAlign: "center",
  bimage_ackgroundColor: "#000000c0"
  },
  wordbox:{
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: 'aliceblue',
    width: "75%",
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

export default Bio;
