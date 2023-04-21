import * as React from 'react';
import {useState,useRef,useEffect} from 'react';
import { TextInput,StyleSheet, View, Text, SafeAreaView, FlatList, TouchableOpacity, Button,PanResponder,Animated ,ImageBackground,ScrollView} from 'react-native';
import { NavigationContainer, useNavigationState } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
     <NavigationContainer>
      <Stack.Navigator initialRouteName = "HomeScreen"> 
        <Stack.Screen name = "HomeScreen" component={HomeScreen} options={{headerShown:false}}/>
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

function NewContactForm({navigation,route}){
  const [text, ChangeText] = useState('Enter Name');
  const [num, ChangeNum] = useState('###-###-####');
  const [date, ChangeDate] = useState('dd/mm/yyyy');
  /*const getData = async (value2) => {
  try {
    const jsonValue = await AsyncStorage.getItem(value2)
    if(jsonValue != null) {
      if(value2 === "Clist") {    
      setList(JSON.parse(jsonValue) );
      console.log(list);}
    }
  } catch(e) {
    // error reading value
   
  }}
  const storeData = async (value,value2) => { 
    try {    
    const jsonValue = JSON.stringify(value)
    console.log(value);
    await AsyncStorage.setItem(value2, jsonValue)
  } catch (e) {
    // saving error

  }
}
useEffect(() => {
  getData("Clist");
},[]);*/

  function handlePress(){
      //storeData(list,"Clist");*/
      navigation.navigate({
        name: 'ContactScreen',
        params: { post: text },
        merge: true,
      });   
  }
  /*navigation.setParams({
   name: {text}
  });*/
  return(
    <View style = {styles.containerC}>
    <Text style = {styles.h1}>Contact Info</Text>
    <TextInput
      style={styles.input}
      onChangeText={ChangeText}
      value={text}
    />
    <TextInput
      style={styles.input}
      onChangeText={ChangeNum}
      value={num}
      />
    <TextInput
      style={styles.input}
      onChangeText={ChangeDate}
      value={date}
    />
    <TouchableOpacity
      style= {styles.saveButton}
      onPress={handlePress}>
      <Text>Save</Text>
    </TouchableOpacity>
  </View>
  );
}


function ContactScreen({navigation,route}){ 
  const[list,setList]=useState([]);   
  /*setName(route.params?.post);    
  const newList = [...list ,newName];
  setList(newList);*/
  React.useEffect(() => {
    if (route.params?.post) {  
      // Post updated, do something with `route.params.post`
      // For example, send the post to the server
      handleItem();
    }
  }, [route.params?.post]);
  useEffect(() => {
    getData("Clist");
  },[]);
  
  const getData = async (value2) => {
    try {
      const jsonValue = await AsyncStorage.getItem(value2)
      if(jsonValue != null) {
        if(value2 ==="Clist") {
        setList(JSON.parse(jsonValue));}
      }
    } catch(e) {
      // error reading value
      console.log("hello");
    }
    
  }


  const storeData = async (value,value2) => {
    try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem(value2, jsonValue)
  } catch (e) {
    // saving error
    console.log("hi");
  }
}
  function handleItem(){
    //setName(route.params.post);    
    const newList = [...list ,route.params.post];
    setList(newList);
    storeData(newList,"Clist");
  }
  function handlePress(){  
   // console.log(list);

    navigation.navigate('NewContact');
  

  }
  function Contact({item}){
    return(
      <TouchableOpacity
      style = {styles.profileIcon}>
        <Text>{item}</Text>
        </TouchableOpacity>
    )
  }
return(
  <ScrollView>
    <FlatList contentContainerStyle = {{flex:1,flexDirection:'row',flexWrap:'wrap',padding:25,alignItems:'center'}}  
    data = {list}
    renderItem={({item})=><Contact item={item}/>}  
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
    <ImageBackground source="https://images.rawpixel.com/image_png_500/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvam9iNTQ1LXdpdC0zMWEucG5n.png"
    style = {styles.container}>
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
    </ImageBackground>
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
    left:"35%",
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    width:"30%",
    backgroundColor: '#D3D3D3',
    borderRadius:10,
    borderWidth:2
  },
  plus: {
    fontSize: 80,
    color:'white',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1.5,
    borderRadius:10,
    padding: 10,
  },
  saveButton:{
    height:30,
    width:60,
    alignItems:"center",
    justifyContent:"center",
    backgroundColor:'grey',
    padding:10
  },
  h1: {
    position: "static",
    marginTop:10,
    fontWeight:"bold",
    fontSize:20,
    padding:30
  }
});
