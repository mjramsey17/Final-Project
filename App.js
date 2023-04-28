import * as React from 'react';
import {useState,useRef,useEffect,useMergeState} from 'react';
import { TextInput,StyleSheet, View, Text, SafeAreaView, FlatList, Pressable, Button,PanResponder,Animated ,ImageBackground,ScrollView,Image,TouchableOpacity} from 'react-native';
import { NavigationContainer, useNavigationState } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import journalImage from "./public/images/journal.jpg"
import { SelectList } from 'react-native-dropdown-select-list';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
     <NavigationContainer>
      <Stack.Navigator initialRouteName = "HomeScreen"> 
        <Stack.Screen name = "HomeScreen" component={HomeScreen} options={{headerShown:false}}/>
        <Stack.Screen name = "ContactScreen" component={ContactScreen} options={{headerShown:false}}/>
        <Stack.Screen name = "NewContact" component={NewContactForm} options={{headerShown:false}}/>
        <Stack.Screen name = "JournalScreen" component={JournalScreen} options={{headerShown:false}}/>
        <Stack.Screen name = "ContactInfo" component={ContactInfo}/>
      </Stack.Navigator>
    </NavigationContainer>

  );
}

function JournalScreen({navigation}){
  const [textBoxText,setTextboxText]=useState("Start your journal entry here!");

  return(
    <View style = {styles.journalContainer}>
      <TextInput style = {styles.journalText}
        onChangeText= {setTextboxText}
        value = {textBoxText}>

        </TextInput>
    </View>
  );
}

function ContactInfo({navigation,route}){

  const {contact}=route.params;

  const newContBack = {uri:"https://i.pinimg.com/originals/68/37/41/683741c3a7875e06a339641075834871.jpg"}
  return (
    <ImageBackground source= {newContBack} style ={{width:"100%",height:"100%"}}>
      <View style = {styles.containerCC}>
      <Text style = {styles.contactN}>{contact.name}</Text> 
      <Text style = {styles.contactH}>Phone Number</Text>
      <Text style = {styles.contactN}>{contact.phone}</Text> 
      <Text style = {styles.contactH}>Age</Text>
      <Text style = {styles.contactA}>{contact.age}</Text>
      <Text style = {styles.contactH}>Birthday</Text>
      <Text style = {styles.contactA}>{contact.birth}</Text>
      <Text style = {styles.contactH}>Hometown</Text>
      <Text style = {styles.contactA}>{contact.hometown}</Text>
      <Text style = {styles.contactH}>Relationship</Text>
      <Text style = {styles.contactA}>{contact.relation}</Text>
      <Text style = {styles.contactH}>Our Hobbies</Text>
      <Text style = {styles.contactA}>{contact.hobbies}</Text>
      <Text style = {styles.contactH}>Journal Entries</Text>
      </View>
    </ImageBackground>
  );
}

function NewContactForm({navigation,route}){
  const getData = async (value2) => {
    try {
      const jsonValue = await AsyncStorage.getItem(value2)
      if(jsonValue != null) {

        if(value2==="Cnum"){
          setId(JSON.parse(jsonValue));
        }
      }
    } catch(e) {
    }
    
  }
  const storeData = async (value,value2) => {
    try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem(value2, jsonValue)
  } catch (e) {

  }
}
  const [ID,setId]= useState(0);
  const [text, ChangeText] = useState('Enter Name');
  const [num, ChangeNum] = useState('###-###-####');
  const [date, ChangeDate] = useState('dd/mm/yyyy');
  const [homeTown,changeTown] = useState('City, State');
  const [journalEntries, addEntry]=useState([]);
  const [relation,changeRelation]=useState("Relation");
  const [hobbies,changeHobbies]=useState("Our Hobbies");
  const [age,changeAge] = useState("Age");
  useEffect(() => {
    getData("Cnum");
  },[]);
  function handlePress(){
    const Contact={id:ID,name:text, phone:num, birth:date,hometown:homeTown,age:age,relationship:relation,ourHobby:hobbies,journals:journalEntries}
    storeData(ID+1,'Cnum');
      navigation.navigate({
        name: 'ContactScreen',
        params: { post: Contact },
        merge: true,
      });   
  }
  const newContBack = {uri:"https://i.pinimg.com/originals/68/37/41/683741c3a7875e06a339641075834871.jpg"}
  return(
    <ImageBackground source= {newContBack} style ={{width:"100%",height:"100%"}}>
    <Pressable
      style={{width:"5%",height:"10%",backgroundColor:'tan'}}
      onPress = {() =>navigation.navigate('ContactScreen')}>
      <ImageBackground style = {{height : "100%", width: "100%", alignItems:'center', justifyContent:"center"}}source = {{uri:"https://icons.veryicon.com/png/o/education-technology/ui-icon/contacts-77.png"}}/>
    </Pressable>
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
      onChangeText={changeAge}
      value={age}
    />
    <TextInput
      style={styles.input}
      onChangeText={ChangeDate}
      value={date}
    />
    <TextInput
      style={styles.input}
      onChangeText={changeTown}
      value={homeTown}
    />
    <TextInput
      style={styles.input}
      onChangeText={changeRelation}
      value={relation}
    />
    <TextInput
      style={styles.input}
      onChangeText={changeHobbies}
      value={hobbies}
    />
    <Pressable
      style= {styles.saveButton}
      onPress={handlePress}>
      <Text>Save</Text>
    </Pressable>
  </View>
  </ImageBackground>
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
      handleItem();
    }
  }, [route.params?.post]);
  useEffect(() => {
    getData("Clist");
    getData("Cnum");
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

    }
    
  }


  const storeData = async (value,value2) => {
    try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem(value2, jsonValue)
  } catch (e) {

  }
}
  function handleItem(){   
    const newList = [...list ,route.params.post];
    setList(newList);
    storeData(newList,"Clist");
  }
  function handlePress(){  
    navigation.navigate('NewContact');
  }
  function Contact({item}){
    return(
      <Pressable
      style = {styles.profileIcon}
      onPress= {()=>navigation.navigate('ContactInfo',{contact: item})}>
        <Text>{item.name}</Text>
        </Pressable>
    )
  }

  const data = [
    {key:'1', value:'Name'},
    {key:'2', value:'Phone'},
    {key:'3', value:'Birth'},
    {key:'4',value:'Hometown'},
    {key:'5',value:'Age'},
    {key:'6',value:"Relationship"},
    {key:'7',value:"Hobbies"}
   ]
  const [selected, setSelected] = useState(""); 

  function changedSearch(text){
    let tempSearching = userInput.isSearching;
    if(text=== "search" || text === ""){
      tempSearching = false
    }
    else{
      tempSearching = true;
    }
    let tempList = [];
    if(selected === "Name"){
      tempList = list.filter(contact => String(contact.name).includes(text));
    } 
    else if(selected === "Phone"){
      tempList = list.filter(contact => String(contact.phone).includes(text));
    }
    else if(selected === "Birth"){
      tempList = list.filter(contact => String(contact.birth).includes(text));
    }
    else if(selected === "Hometown"){
      tempList = list.filter(contact => String(contact.hometown).includes(text));
    }
    else if(selected === "Age"){
      tempList = list.filter(contact => String(contact.age).includes(text));
    }
    else if(selected === "Hobbies"){
      tempList = list.filter(contact => String(contact.hobbies).includes(text));
    }
    else if(selected === "Relationship"){
      tempList = list.filter(contact => String(contact.relation).includes(text));
    }
    changeUserInput({searchText: text, isSearching: tempSearching, FList:tempList});
  } 
  const contBack= {uri: "https://wallpaperaccess.com/full/198038.jpg"};
  const homeBut = {uri:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmhe26YhSN4aU1O5cZqBwZ0SBSaNNhZwjHQg&usqp=CAUhttps://p7.hiclipart.com/preview/104/498/557/5bbc427426f04.jpg"}
return(  
  <ImageBackground style ={{width:"100%",height:"100%",position:"absolute",zIndex:-1}}source = {contBack}>    
  <Pressable onPress={() =>navigation.navigate('HomeScreen')} style={{width:"5%",height:"10%"}}><Image source = {homeBut}  style = {{width:"100%",height:"100%",borderRadius:10}}  /></Pressable>
  <View style={{alignItems:"center"}}>  
  <Text style ={{fontSize:40,fontWeight:"bold"}}>Contacts</Text>
    <View style = {{display:"flex",flexDirection:"row",borderColor:'black',borderWidth:3,width:"40%",borderRadius:10,backgroundColor:"black",zIndex:10}}>
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
  </ImageBackground>
);
}

function HomeScreen({navigation}){
  const back = {uri:"https://cdn.pixabay.com/photo/2016/10/14/21/20/fireplace-1741208_1280.jpg"}
  const journal = {uri:"https://www.svgrepo.com/show/197786/open-book-reader.svg"}
  return(
    <ImageBackground style = {{width:"100%",height:"100%",alignItems:'center'}}source={back}>
      <Text style= {{fontSize:50,fontWeight:'bold',color:'white'}}>Daily Vintage</Text>
    <View style = {styles.container}>
        <Pressable
         style = {styles.button2}
          onPress = {() =>navigation.navigate('JournalScreen')}>
          <ImageBackground style= {{height:"90%",width:"100%",alignItems:"center",justifyContent:"center"}}source = {journal}/>
        </Pressable>
        <Pressable
         style = {styles.button}
         onPress = {() =>navigation.navigate('ContactScreen')}>
          <ImageBackground style = {{height : "100%", width: "100%", alignItems:'center', justifyContent:"center"}}source = {{uri:"https://icons.veryicon.com/png/o/education-technology/ui-icon/contacts-77.png"}}/>
        </Pressable>
    </View>
   </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: "space-evenly",
    height:'100%',
    width:'100%',
    flexDirection:'row'
  },
  button: {
    backgroundColor: "#ffad01",
    width:200,
    height:200,
    alignItems:'center',
    justifyContent:'center',
    borderRadius:10,
    padding:15,
    shadowRadius:30,
  },  
  button2:{
    backgroundColor: "#5C4033",
    width:200,
    height:200,
    alignItems:'center',
    justifyContent:'center',
    borderRadius:10,
    padding:15,
    shadowRadius:30,
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
    shadowColor:"#a88f59",
    shadowRadius:10,
    borderRadius: 10,
    backgroundColor:'#FFFDD0',
    fontFamily:"handwriting"
  },
  containerC:{
    left:"35%",
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    width:"30%",
    backgroundColor:'#FFFDD0',
    borderRadius:10,
    borderWidth:2
  },
  containerCC:{
    left:"35%",
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    width:"30%",
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
    padding:5
  },
  h1: {
    position: "static",
    marginTop:10,
    fontWeight:"bold",
    fontSize:20,
    padding:5
  },
  contactN: {
    fontSize: 30,
    fontWeight: 20,
  },
  contactH:{
    fontSize:20,
    fontWeight: 10,
    //borderColor:"black",
    //borderWidth:1,
  },
  contactA:{
    fontSize:15,
    fontWeight: 5,
    borderBottomWidth:1,
    width:"50%",
    alignItems:'center'
  },
  searchBar:{
    height:45,
    width:"60%",
    borderWidth: 1.5,
    borderRadius:10,
    backgroundColor:'white'
  },
  journalContainer:{
    backgroundImage: `url(${journalImage})`,
    height: '100vh',
    width:'100vw'
  },
  journalText:{
    marginLeft:'135px',
    fontSize:'23px',
    height:'23px',
    marginTop:'138px'
  }
});