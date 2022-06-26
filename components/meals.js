import React, { useState, useEffect } from 'react';
import { Text, FlatList, View, Image, StyleSheet, TextInput } from 'react-native';



const MealSearch = () => {
    const [data,setData] = useState([]);
    const [keyword,setKeyword] = useState("beef");
    const [loading,setLoading] = useState(true);

    const getMeals = async () => {
        try {
          const url = ("https://api.edamam.com/api/recipes/v2?type=public&q="+keyword+"&app_id=ca24dd58&app_key=0229ad644e7bbd96e90b4ec5bcca6985")
          const response = await fetch(url);
          const json = await response.json();
          setData(json.hits); 
        } catch (error) {
          console.error(error);
        } finally {
            setLoading(false);
        }
      };
    const fooddisplay = (item) => {
      return(
      <View style = {styles.container}>
        <Text style = {styles.meal_title}>{item.recipe.label}</Text>
        <View style = {{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View>
            <Image style = {{width: 100, height: 100, marginTop: 20, marginBottom: 20}}
              source = {{
                uri: item.recipe.image
              }}/>
              <Text> {Math.round(item.recipe.calories)} cal</Text>
          </View>
          <View style = {{marginHorizontal: 16,}}>
            <FlatList 
              data={item.recipe.ingredients}
              renderItem={({ item }) => <Text>  - {item.food}</Text>}
              keyExtractor={item => item.id}
            />
            <Text> </Text>
            <Text> CAUTIONS: </Text>
            <FlatList 
              data={item.recipe.cautions}
              renderItem={({ item }) => <Text>  - {item}</Text>}
              keyExtractor={item => item.id}
            />
          </View>
        </View>
      </View>
            )
    }
    useEffect(() => {getMeals()}, [keyword])

    return(
      <View style = {{paddingTop: 50}}>
        <Text style = {{fontSize:30,fontWeight:'bold', alignSelf: 'center'}}>Meal Finder</Text>
        <View style = {{flexDirection: 'column'}}>
        <Text style = {{alignSelf: 'center'}}> Search for you meal</Text>
        <TextInput
          style={styles.input}
          onChangeText={newText => setKeyword(newText)}
          defaultValue={keyword}
          placeholder="enter keyword"
        />
      </View>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          fooddisplay(item)
        )}
        keyExtractor={item => item.id}
      />
    </View>
        
    );    
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'floralwhite',
    marginVertical: 25,
    marginHorizontal: 16,
  },
  meal_title:{
      fontSize: 24,
      fontWeight: 'bold',
      padding:10,
  },
   input: {
    height: 30,
    margin: 12,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
});

export default MealSearch;