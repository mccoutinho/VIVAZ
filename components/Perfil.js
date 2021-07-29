import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  Settings,
  TouchableOpacity,
} from "react-native";
import firebase from "../config/firebaseConfig";
import ProfilePic from "../components/features/ProfilePic";
import Post from "./features/Post";
import Ionicons from "react-native-vector-icons/Ionicons";
import { createStackNavigator } from "@react-navigation/stack";
import ShowFriends from './features/ShowFriends';

const PerfilShow = ({navigation}) => {
  const [nome, setNome] = useState("");
  const [sexo, setSexo] = useState("");
  const [concelho, setConcelho] = useState("");
  const [imagem, setImagem] = useState(null);
  const [settings, setSettings] = useState(false);
  const [friends, setFriends] = useState([]);
  const [medalhas, setMedalhas] = useState([]);

  const user = firebase.auth().currentUser;
  const uid = user.uid;

  useEffect(() => {
    const data = async () => {
      firebase
        .firestore()
        .collection("utilizadores")
        .doc(uid)
        .get()
        .then((doc) => {
          if (doc.exists) {
            setNome(doc.data().nome);
            setImagem(doc.data().imagem);
            setConcelho(doc.data().concelho);
            setSexo(doc.data().sexo);
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
        })
        .catch((error) => {
          console.log("Error getting document:", error);
        });

        firebase
      .firestore()
      .collection("amigos")
      .doc(uid)
      .get()
      .then((doc) => {
        if(doc.exists){
        setFriends(doc.data().friendsList);
        }
        else {
          console.log("Não tem amigos! :(")
        }
      });

      firebase
      .firestore()
      .collection("medalhas")
      .doc(uid)
      .get()
      .then((doc) => {
        if(doc.exists){
        setMedalhas(doc.data().medalhas);
        }
        else {
          console.log("Não tem medalhas! :(")
        }
      });
    };
    data();

  }, []);

    return (
    <ScrollView>
      <View style={{ alignItems: "center", marginTop:10 }}>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 20,
            fontFamily: "Roboto",
            marginVertical: 20,
          }}
        >
          {nome}
        </Text>
        <View
          style={{
            position: "absolute",
            top: 20,
            right: 25,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
          style={{alignSelf:"flex-end" }}
            onPress={async () => {
              await firebase.auth().signOut();
              navigation.navigate("Onboarding");
            }}
          >
            <Ionicons name="log-out-outline" size={30} color="black" />
            <Text style={{ fontFamily: "Roboto" }}>Sair</Text>
          </TouchableOpacity>
        </View>
        <ProfilePic image={{ uri: imagem }} />
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 30,
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 24,
                fontWeight: "bold",
                fontFamily: "Roboto",
              }}

              onPress={() => {
                navigation.navigate('ShowFriends', {friends:friends})
              }}
            >
              {friends.length}
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 24,
                fontWeight: "bold",
                fontFamily: "Roboto",
              }}
            >
              11
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 24,
                fontWeight: "bold",
                fontFamily: "Roboto",
              }}
            >
              {medalhas.length}
            </Text>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 16, fontFamily: "Roboto" }}>amigos</Text>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 16, fontFamily: "Roboto" }}>
              atividades
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 16, fontFamily: "Roboto" }}>
              conquistas
            </Text>
          </View>
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 30,
            borderStyle: "solid",
            borderColor: "#ff7033",
            borderWidth: 2,
            borderRadius: 8,
            width: "80%",
            height: 50,
          }}
        >
          <Text
            style={{
              margin: 40,
              fontSize: 16,
              fontWeight: "bold",
              fontFamily: "Roboto",
              color: "#ff7033",
            }}
          >
            Editar Perfil
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          width: "80%",
          alignSelf: "center",
          marginTop: 40,
          marginBottom: 20,
        }}
      >
        <Text
          style={{ fontFamily: "Roboto", fontWeight: "bold", fontSize: 20 }}
        >
          Atividade
        </Text>
      </View>
    </ScrollView>
    )
      };

  


const Perfil = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator headerMode="none" initialRouteName={PerfilShow}>
      <Stack.Screen name="CardListComponent" component={PerfilShow} />
      <Stack.Screen name="ShowFriends" component={ShowFriends} />
    </Stack.Navigator>
  );
};

export default Perfil;
