import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Image,
  FlatList
} from "react-native";
import firebase from "../config/firebaseConfig";
import CardList from "./features/CardList";
import { createStackNavigator } from "@react-navigation/stack";

const ConquistasComponent = ({ navigation }) => {
  const [selected, setSelected] = useState("medalhas");
  const [medalhas, setMedalhas] = useState([]);
  const [users, setUsers] = useState([]);
  
  const uid = firebase.auth().currentUser.uid;

  useEffect(() => {
    firebase
      .firestore()
      .collection("medalhas")
      .doc(uid)
      .get()
      .then((doc) => {
        if(doc.exists) {
        setMedalhas(doc.data().medalhas);
        } else {
          console.log("Não tem medalhas!");
        }
      });

      firebase
      .firestore()
      .collection("utilizadores")
      .get()
      .then((snapshot) => {
        let users = snapshot.docs.map((doc) => {
          const data = doc.data();
          const id = doc.id;
          return { id, ...data };
        });
        setUsers(users);
      });

  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fcfcfc" }}>
      <View style={{ marginLeft: 25, marginTop: 20 }}>
        <Text
          style={{ fontFamily: "Roboto", fontSize: 40, fontWeight: "bold" }}
        >
          Conquistas
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          marginTop: 20,
          height: 40,
          width: "100%",
        }}
      >
        <TouchableOpacity
          onPress={() => setSelected("medalhas")}
          style={
            selected == "medalhas"
              ? {
                  flex: 0.5,
                  justifyContent: "center",
                  alignItems: "center",
                  borderBottomWidth: 3,
                  borderColor: "#ff7033",
                }
              : {
                  flex: 0.5,
                  justifyContent: "center",
                  alignItems: "center",
                  borderBottomWidth: 3,
                  borderColor: "#d2d2d2",
                }
          }
        >
          <Text
            style={
              selected == "medalhas"
                ? {
                    fontFamily: "Roboto",
                    fontSize: 16,
                    fontWeight: "bold",
                    color: "#ff7033",
                  }
                : { fontFamily: "Roboto", fontSize: 16, color: "#141414" }
            }
          >
            Medalhas
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelected("lider")}
          style={
            selected == "lider"
              ? {
                  flex: 0.5,
                  justifyContent: "center",
                  alignItems: "center",
                  borderBottomWidth: 3,
                  borderColor: "#ff7033",
                }
              : {
                  flex: 0.5,
                  justifyContent: "center",
                  alignItems: "center",
                  borderBottomWidth: 3,
                  borderColor: "#d2d2d2",
                }
          }
        >
          <Text
            style={
              selected == "lider"
                ? {
                    fontFamily: "Roboto",
                    fontSize: 16,
                    fontWeight: "bold",
                    color: "#ff7033",
                  }
                : { fontFamily: "Roboto", fontSize: 16, color: "#141414" }
            }
          >
            Líder
          </Text>
        </TouchableOpacity>
      </View>
      {selected == "medalhas" ? (
        <View style={{ flex: 1 }}>
          <View style={{flexDirection:"row", flexWrap:"wrap", alignSelf:"center", justifyContent:"space-evenly"}}>
          {medalhas.length!=0 ? (
            medalhas.map((element, index) => <Image style={{height:180, width:180, marginVertical:10}} source={{ uri: element }} key={index}/>)
          ) : (
            <View style={{justifyContent:"center", alignItems:"center", height:"100%"}}><Text style={{fontFamily:"Roboto", fontSize:16, color:"#141414"}}>Ainda não tem medalhas!</Text></View>
          )}
        </View>
        </View>
      ) : (
        <View style={{ flex: 1 }}>
        <View style={{flexDirection:"row", flex:1}}>
        <View style={{flex:1}}>
        <View style={{flexDirection:"column"}}>
        <Image style={{borderRadius:60, height:100, width:100, alignSelf:"center", marginTop:70}} source={{uri:"https://firebasestorage.googleapis.com/v0/b/vivaz-12343.appspot.com/o/users%2FS1JYqLZWUHMG14hbnBum3MxXQAg1?alt=media&token=6f5ef401-e914-4b38-8c53-c9af00c54599"}} />
        <Text style={{fontFamily:"Roboto", fontSize:16, fontWeight:"bold", alignSelf:"center"}}>Joaquim Alberto</Text>
        </View>
        <View style={{backgroundColor:"#ff7033", borderRadius:100, height:30, width:30, justifyContent:"center", alignItems:"center", position:"absolute", top:70, left:10}}>
          <Text style={{fontFamily:"Roboto", fontSize:16, fontWeight:"bold", color:"white"}}>2</Text>
          </View>
        </View>
        <View style={{flex:1, marginTop:20}}>
        <View style={{flexDirection:"column"}}>
        <Image style={{borderRadius:80, height:150, width:150, alignSelf:"center"}} source={{uri:"https://firebasestorage.googleapis.com/v0/b/vivaz-12343.appspot.com/o/users%2FdXphkqxNznbpHSoYxJNsNNE7qaT2?alt=media&token=923701ac-d338-4de8-b5f3-29b03d7a012b"}} />
        <Text style={{fontFamily:"Roboto", fontSize:16, fontWeight:"bold", alignSelf:"center"}}>Vivaz Admin</Text>
        </View>
        <View style={{backgroundColor:"#ff7033", borderRadius:100, height:30, width:30, justifyContent:"center", alignItems:"center", position:"absolute", left:10}}>
          <Text style={{fontFamily:"Roboto", fontSize:16, fontWeight:"bold", color:"white"}}>1</Text>
        </View>
        </View>
        <View style={{flex:1}}>
        <View style={{flexDirection:"column"}}>
        <Image style={{borderRadius:60, height:100, width:100, alignSelf:"center", marginTop:70}} source={require('../assets/onboarding/Woman.png')} />
        <Text style={{fontFamily:"Roboto", fontSize:16, fontWeight:"bold", alignSelf:"center"}}>Ana Só</Text>
        </View>
        <View style={{backgroundColor:"#ff7033", borderRadius:100, height:30, width:30, justifyContent:"center", alignItems:"center", position:"absolute", top:70, left:10}}>
          <Text style={{fontFamily:"Roboto", fontSize:16, fontWeight:"bold", color:"white"}}>3</Text>
        </View>
        
        </View>
        </View>
        <View style={{ marginTop: 220 }}>
        <FlatList
          numColumns={1}
          horizontal={false}
          data={users}
          renderItem={({ item, index }) => (
            <View
              style={{
                height: 70,
                flexDirection: "row",
                flexWrap: "wrap",
                flex: 1,
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  flex: 0.8,
                  marginLeft: 20,
                  flexDirection: "row",
                  flexWrap: "wrap",
                  alignItems: "center",
                }}
              >
                <Text style={{fontFamily:"Roboto", fontSize:18, fontWeight:"bold", marginRight:20}}>{index+4}</Text>
                <Image
                  style={{ height: 44, width: 44, borderRadius: 40 }}
                  source={{ uri: item.imagem }}
                />
                <Text
                  style={{ fontFamily: "Roboto", fontSize: 16, marginLeft: 20 }}
                >
                  {item.nome}
                </Text>
              </View>
            </View>
          )}
        />
      </View>
        </View>
      )}
    </SafeAreaView>
  );
};

const Explorar = ({ navigation, route }) => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator headerMode="none" initialRouteName={ConquistasComponent}>
      <Stack.Screen
        name="ConquistasComponent"
        component={ConquistasComponent}
      />
    </Stack.Navigator>
  );
};

export default Explorar;
