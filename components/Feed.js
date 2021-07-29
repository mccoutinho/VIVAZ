import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, Image } from "react-native";
import firebase from "../config/firebaseConfig";
import Post from "./features/Post";
import Search from "./features/Search";
import Notifications from "./features/Notifications";

const Feed = ({ navigation }) => {
  const user = firebase.auth().currentUser;
  const uid = firebase.auth().currentUser.uid;
  const [search, setSearch] = useState(false);
  const [notification, setNotification] = useState(false);
  const [texto, setTexto] = useState("");
  const [nome, setNome] = useState("");
  const [posts, setPosts] = useState([]);
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    try{
     firebase.firestore().collection("amigos").doc(uid).onSnapshot((doc) => {
       if(doc.exists) {
      setFriends(doc.data().friendsList);
       } else {console.log("Não tem amigos ainda!")}
      });
    } catch(err) {
      console.log("Os teus amigos não publicaram posts!")
    }
}, []);

  const getPosts = () => {
  if(friends.length != 0) {
    firebase.firestore().collection("feed").where("criador", "in", friends).onSnapshot((snapshot) => {
      let posts = snapshot.docs.map((doc) => {
        const data = doc.data();
        const id = doc.id;
        return { id, ...data };
      });
      setPosts(posts);
    })

  }
  return posts;
}

  getPosts();

  if (search) {
    return <Search setSearch={setSearch}/>;
  } 
  
  if(notification) {
    return <Notifications setNotification={setNotification} />
  } 
  
  if(!search && !notification) {
    return (
      <View style={{ backgroundColor: "#fcfcfc", flex:1 }}>
        <View
          style={{
            width: "90%",
            alignSelf: "center",
            flex: 1,
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
            marginTop: 30,
          }}
        >
          <Text
            style={{
              fontFamily: "Roboto",
              fontSize: 40,
              fontWeight: "bold",
              flex: 0.8,
            }}
          >
            Social
          </Text>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              style={{ marginRight: 10, alignItems:"center" }}
              onPress={() => {
                setSearch(true);
                return <Search />;
              }}
            >
              <Image  style={{height:30, width:30}} source={require('../assets/pesquisar.png')} />
              <Text style={{fontFamily:"Roboto", fontSize:14}}>Pesquisar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setNotification(true)} style={{alignItems:"center"}}>
              <Image style={{height:30, width:30}} source={require('../assets/Notification.png')} />
              <Text style={{fontFamily:"Roboto", fontSize:14}}>Notificações</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{marginTop:70, marginBottom:40}}>
        <ScrollView>
        {posts.length!=0 ? posts.map((element, index) => {
              return (<Post texto={element.texto} friend={element.criador} image={element.imagem} key={index}/>)
            }) :
            <Text style={{fontFamily:"Roboto", fontSize:14, alignSelf:"center"}}>Não tem amigos :(</Text>
            }
          </ScrollView>
          </View>
      </View>
    );
  }
};

export default Feed;
