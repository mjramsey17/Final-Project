import * as React from 'react';
import {useState,useRef,useEffect} from 'react';
import { TextInput,StyleSheet, View, Text, SafeAreaView, FlatList, TouchableOpacity, Button,PanResponder,Animated ,ImageBackground,ScrollView} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
     <NavigationContainer>
      <Stack.Navigator initialRouteName = "HomeScreen"> 
        <Stack.Screen name = "HomeScreen" component={HomeScreen}/>
        <Stack.Screen name = "ContactScreen" component={ContactScreen}/>
        <Stack.Screen name = "NewContact" component={NewContactForm}/>
        <Stack.Screen name = "JournalScreen" component={JournalScreen}/>
      </Stack.Navigator>
    </NavigationContainer>

  );
}

function JournalScreen({navigation}){
  return(
    <View style = {styles.container}>
      <Text>This is the journal screen</Text>
    </View>
  );
}

function NewContactForm({route, navigation}){
  const [text, onChangeText] = React.useState('Enter Name');
  navigation.setParams({
   name: {text}
  });
  return(
    <View style = {styles.container}>
    <TextInput
      style={styles.input}
      onChangeText={onChangeText}
      value={text}
    />
    <TouchableOpacity
      style= {styles.saveButton}
      /*onPress={ ()=> {
        navigation.navigate({
          name: 'ContactScreen',
          params: { name: text },
          merge: true,
        });
      }}*/>
      <Text>Save</Text>
    </TouchableOpacity>
  </View>
  );
}
function ContactScreen({navigation}){
  const[list,setList]=useState([])
  function handlePress(){
    navigation.navigate('NewContact',{name:' '});
    const newList = list.concat(1);
    setList(newList);
  }
  function Contact({item}){
    return(
      <TouchableOpacity
      style = {styles.profileIcon}>
        {item}
        </TouchableOpacity>
    )
  }
return(
  <ScrollView style = {styles.containerC}>


    <FlatList contentContainerStyle = {{flex:1,flexDirection:'row',flexWrap:'wrap',padding:25,alignItems:'center'}}  
    data = {list}
    renderItem={({item})=> <Contact item={item}/>}  
    ItemSeparatorComponent={() => <View style={{paddingLeft:200,height:40}}/> }
    />     
    <TouchableOpacity
      style = {styles.container2}
      onPress = {handlePress}>
        <Text style = {styles.plus}>+</Text>
    </TouchableOpacity>  
   
  </ScrollView>
);
}

function HomeScreen({navigation}){

  return(
    <View style = {styles.container}>
        <TouchableOpacity
         style = {styles.button2}
          onPress = {() =>navigation.navigate('JournalScreen')}>
          <ImageBackground style = {{height : "90%", width: "100%", alignItems:'center', justifyContent:"center"}}source = {{uri: "https://www.svgrepo.com/show/197786/open-book-reader.svg"}}/>
        </TouchableOpacity>
        <TouchableOpacity
         style = {styles.button}
         onPress = {() =>navigation.navigate('ContactScreen')}>
          <ImageBackground style = {{height : "100%", width: "100%", alignItems:'center', justifyContent:"center"}}source = {{uri:"https://icons.veryicon.com/png/o/education-technology/ui-icon/contacts-77.png"}}/>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    height:'100%',
    width:'100%'
  },
  button: {
    backgroundColor: "grey",
    width:200,
    height:200,
    alignItems:'center',
    justifyContent:'center',
    borderRadius:10

  },  
  button2:{
    backgroundColor: "#5C4033",
    width:200,
    height:200,
    alignItems:'center',
    justifyContent:'center',
    borderRadius:10
  },
  container2: {
    backgroundColor:'blue',
    position: 'sticky',
    bottom:10,
    left:"95%",
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    //padding: 10,
    borderRadius: 100,
  },
  profileIcon:{
    height:85,
    width:125,
    alignItems:"center",
    justifyContent:"center",
    borderColor:'black',
    borderWidth:3,
    borderRadius: 10,
    backgroundColor:'grey'
  },
  containerC:{
  },
  plus: {
    fontSize: 80,
    color:'white',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  saveButton:{
    height:30,
    width:60,
    backgroundColor:'grey'
  }
});
