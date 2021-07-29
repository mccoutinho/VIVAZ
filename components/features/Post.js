import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, SafeAreaView } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import firebase from "../../config/firebaseConfig";

const Post = ({ image, texto, friend }) => {
  const [username, setUsername] = useState("");
  const [userimage, setUserImage] = useState(null);

  useEffect(() => {
    firebase
      .firestore()
      .collection("utilizadores")
      .doc(friend)
      .onSnapshot((doc) => {
        setUsername(doc.data().nome);
        setUserImage(doc.data().imagem);
      });
  }, []);

  return (
      <View style={{height:480, borderBottomColor:"#d2d2d2", borderBottomWidth:6, marginBottom:20}}>
    <View style={{ height: 250, width: "100%", marginTop: 10 }}>
      <View style={{ flexDirection: "row", marginLeft: 30 }}>
        <Image
          style={{ height: 50, width: 50, borderRadius: 60 }}
          source={{ uri: userimage }}
        />
        <Text style={styles.text}>{username}</Text>
      </View>
      <View style={{ width: "95%", alignSelf: "center", marginTop: 10 }}>
        <Text style={styles.body}>{texto}</Text>
      </View>
      <View>
        <Image
          style={{ width: "100%", height: 300, marginVertical: 20 }}
          source={{ uri: image }}
        />
      </View>
      <View style={{ flexDirection: "row", width:"100%"}}>
        <View style={{ flex: 0.5, flexDirection:"row", justifyContent:"center", alignItems:"center" }}>
            <Image source={require('../../assets/gosto.png')} />
            <Text style={styles.text}>Gosto</Text>
        </View>
        <View style={{ flex: 0.5, flexDirection:"row", justifyContent:"center", alignItems:"center" }}>
            <Image source={require('../../assets/comentar.png')} />
            <Text style={styles.text}>Comentar</Text>
        </View>
      </View>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    width: 56,
    height: 56,
    flexDirection: "column",
    justifyContent: "flex-end",
    borderRadius: 500,
  },
  image: {
    flex: 1,
    width: "100%",
    height: undefined,
    zIndex: -1,
    alignSelf: "auto",
    borderRadius: 500,
    opacity: 1,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Roboto",
    marginLeft: 14,
  },
  body: {
    fontSize: 16,
    fontFamily: "Roboto",
    marginLeft:20
  },
});

export default Post;
