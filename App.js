import * as React from 'react';
import {useState,useRef,useEffect,useMergeState} from 'react';
import { TextInput,StyleSheet, View, Text, SafeAreaView, FlatList, Pressable, Button,PanResponder,Animated ,ImageBackground,ScrollView} from 'react-native';
import { NavigationContainer, useNavigationState } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Dropdown from 'react-native-input-select';
///import ContactScreen from './ContactScreen.js';
import { SelectList } from 'react-native-dropdown-select-list';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
     <NavigationContainer>
      <Stack.Navigator initialRouteName = "HomeScreen"> 
        <Stack.Screen name = "HomeScreen" component={HomeScreen} options={{headerShown:false}}/>
        <Stack.Screen name = "ContactScreen" component={ContactScreen}/>
        <Stack.Screen name = "NewContact" component={NewContactForm}/>
        <Stack.Screen name = "JournalScreen" component={JournalScreen}/>
        <Stack.Screen name = "ContactInfo" component={ContactInfo}/>
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

function ContactInfo({navigation,route}){

  const {contact}=route.params;

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style = {styles.contactN}>{contact.name}</Text>
      <Text style = {styles.contactH}>Phone Number</Text>
      <Text style = {styles.contactA}>{contact.phone}</Text>
      <Text style = {styles.contactH}>Birthday</Text>
      <Text style = {styles.contactA}>{contact.birth}</Text>
    </View>
  );
}

function NewContactForm({navigation,route}){
  const getData = async (value2) => {
    try {
      const jsonValue = await AsyncStorage.getItem(value2)
      if(jsonValue != null) {
        /*if(value2 ==="Clist") {
          setList(JSON.parse(jsonValue));
        }*/
        if(value2==="Cnum"){
          setId(JSON.parse(jsonValue));
          console.log(ID);
        }
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
  const [ID,setId]= useState(0);
  const [text, ChangeText] = useState('Enter Name');
  const [num, ChangeNum] = useState('###-###-####');
  const [date, ChangeDate] = useState('dd/mm/yyyy');
  useEffect(() => {
    getData("Cnum");
  },[]);
  function handlePress(){
    const Contact={id:ID,name:text, phone:num, birth:date}
    storeData(ID+1,'Cnum');
      navigation.navigate({
        name: 'ContactScreen',
        params: { post: Contact },
        merge: true,
      });   
  }

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
    <Pressable
      style= {styles.saveButton}
      onPress={handlePress}>
      <Text>Save</Text>
    </Pressable>
  </View>
  );
}


function ContactScreen({navigation,route}){ 
  /*const clearStorage = async () => {
    try {
      await AsyncStorage.clear();
      alert('Storage successfully cleared!');
    } catch (e) {
      alert('Failed to clear the async storage.');
    }
  };
  useEffect(() => {
    clearStorage();
  },[]);*/
  const[list,setList]=useState([]);   
  const[number, setNumber]= useState(0);
  //const[FList,setFList] = useState();
  //const [searchText, changeSearch]= useState('Search');
  //const[isSearching,changeIsSearch] = useState(false);  
  const useMergeState = (initialState = {}) => {
    const [value, setValue] = React.useState(initialState);
  
    const mergeState = newState => {
      if (typeof newState === 'function') newState = newState(value);
      setValue({ ...value, ...newState });
    };
  
    return [value, mergeState];
  };
  const[userInput, changeUserInput] = useMergeState({
    searchText:'Search',
    isSearching: false,
    FList:[],
  });
  React.useEffect(() => {
    if (route.params?.post) {  
      // Post updated, do something with `route.params.post`
      // For example, send the post to the server
      handleItem();
    }
  }, [route.params?.post]);
  useEffect(() => {
    getData("Clist");
    getData("Cnum");
   // console.log(list);
   // console.log(FList);
  },[]);
  
  const getData = async (value2) => {
    try {
      const jsonValue = await AsyncStorage.getItem(value2)
      if(jsonValue != null) {
        if(value2 ==="Clist") {
          setList(JSON.parse(jsonValue));
        }
        else if(value2==="Cnum"){
          setNumber(JSON.parse(jsonValue));
        }
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
    console.log(item.name+item.id);
    return(
      <Pressable
      style = {styles.profileIcon}
      onPress= {()=>navigation.navigate('ContactInfo',{contact: item})}>
        <Text>{item.name}</Text>
        </Pressable>
    )
  }
  function filterList({searchText}){
    /*console.log(selected);
    let tempList = [];
    if(selected === "Name"){
      console.log("attempting to filter name");
      console.log(searchText);
      tempList = list.filter(contact => contact.name === searchText);
      console.log(tempList);
    }
    else if(selected === "Phone"){
      tempList = list.filter(contact => contact.phone === searchText);
    }
    else if(selected === "Birth"){
      tempList = list.filter(contact => contact.birth === searchText);
    }
    setFList(tempList);*/
  }
      /*<Dropdown
        label = "Search"
        placeholder = "Select a element.."
        options = {[
          {name:"Name",code:"NM"},
          {name:"Phone",code:'#'},
          {name:"Birthday",code:'BD'}]}
        optionLabel={'name'}
        optionValue={'code'}
        selectedValue={selected}
        onValueChange={(value) => setSelected(value)}
        primaryColor={'green'}   
        />*/
  const data = [
    {key:'1', value:'Name'},
    {key:'2', value:'Phone'},
    {key:'3', value:'Birth'},
   ]
  const [selected, setSelected] = useState(""); 
  function checkSearchBar(){
    //console.log(FList.name);
    
  }
  function changedSearch(text){
    let tempSearching = userInput.isSearching;
    if(text=== "search" || text === ""){
      tempSearching = false
    }
    else{
      tempSearching = true;
    }
    console.log(selected);
    let tempList = [];
    if(selected === "Name"){
      console.log("attempting to filter name");
      console.log(text);
      tempList = list.filter(contact => String(contact.name).includes(text));
      console.log(tempList);
    } 
    else if(selected === "Phone"){
      tempList = list.filter(contact => String(contact.phone).includes(text));
    }
    else if(selected === "Birth"){
      tempList = list.filter(contact => String(contact.birth).includes(text));
    }
    changeUserInput({searchText: text, isSearching: tempSearching, FList:tempList});
  }
return(
  <View style = {{alignItems:"center"}}>  
    <View style = {{display:"flex",flexDirection:"row",borderColor:'black',borderWidth:3,width:"40%",borderRadius:10,backgroundColor:"black"}}>
      <TextInput 
        style={styles.searchBar}
        onChangeText={changedSearch}
        value={userInput.searchText}/> 
      <View style= {{width:"40%",borderColor:'black',borderWidth:1,height:45,backgroundColor:"white",borderRadius:10}}>      
        <SelectList   
        setSelected={(val) => setSelected(val)} 
        data={data} 
        save="value"
      /></View>

    </View>
    <FlatList contentContainerStyle = {{flexWrap:'wrap',flexDirection:'row',padding:25,alignItems:'center'}}  
    data = {userInput.isSearching ? userInput.FList : list}
    renderItem={({item})=><Contact item={item}/>}  
    ItemSeparatorComponent={() => <View style={{paddingLeft:200,height:40}}/> }
    />     
    <Pressable
      style = {styles.container2}
      onPress = {handlePress}>
        <Text style = {styles.plus}>+</Text>
    </Pressable>  
   
</View>
);
}

function HomeScreen({navigation}){

  return(
    //<ImageBackground source="https://images.rawpixel.com/image_png_500/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvam9iNTQ1LXdpdC0zMWEucG5n.png"
    //>
    <View style = {styles.container}>
        <Pressable
         style = {styles.button2}
          onPress = {() =>navigation.navigate('JournalScreen')}>
        </Pressable>
        <Pressable
         style = {styles.button}
         onPress = {() =>navigation.navigate('ContactScreen')}>
          <ImageBackground style = {{height : "100%", width: "100%", alignItems:'center', justifyContent:"center"}}source = {{uri:"https://icons.veryicon.com/png/o/education-technology/ui-icon/contacts-77.png"}}/>
        </Pressable>
    </View>
   // </ImageBackground>
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
  },
  contactN: {
    fontSize: 30,
    fontWeight: 20,
  },
  contactH:{
    fontSize:20,
    fontWeight: 10
  },
  contactA:{
    fontSize:15,
    fontWeight: 5
  },
  searchBar:{
    height:"100%",
    width:"60%",
    borderWidth: 1.5,
    borderRadius:10,
    backgroundColor:'white'
  }
});