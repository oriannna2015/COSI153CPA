import React from "react";
import { StyleSheet, Text, View, SafeAreaView, SectionList, StatusBar } from "react-native";

const DATA = [
  {
    title: "Basic Info",
    data: ["Brandeis 2023", "Major: BCHM|COSI"]
  },
  {
    title: "Skills",
    data: ["Cooking", "Visual Design", "Drums"]
  },
  {
    title: "What I like",
    data: ["Cartoon Character 'Gudetama'", "Video Games"]
  },
];

const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.components}> - {title}</Text>
  </View>
);

const App = () => (
  <SafeAreaView style={styles.container}>
    <SectionList
      sections={DATA}
      keyExtractor={(item, index) => item + index}
      renderItem={({ item }) => <Item title={item} />}
      renderSectionHeader={({ section: { title } }) => (
        <Text style={styles.title}>{title}</Text>
      )}
    />
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    marginHorizontal: 16
  },
  item: {
    padding: 5,
    marginVertical: 5
  },
  title: {
    backgroundColor:'aliceblue',
    alignSelf: 'flex-start',
    paddingLeft: 20,
    paddingRight: 20,
    fontSize: 24,
    fontWeight: 450,
  },
  components: {
    fontSize: 18
  }
});

export default App;