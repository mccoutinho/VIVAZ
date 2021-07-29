import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import firebase from "../../config/firebaseConfig";

const Search = ({ setSearch }) => {
  const user = firebase.auth().currentUser;
  const uid = user.uid;
  const [users, setUsers] = useState([]);
  const [nome, setNome] = useState("");
  const [imagem, setImagem] = useState(null);

  useEffect(() => {
    const image = async () => {
      firebase
        .firestore()
        .collection("utilizadores")
        .doc(uid)
        .get()
        .then((doc) => {
          if (doc.exists) {
            setNome(doc.data().nome);
            setImagem(doc.data().imagem);
          } else {
            console.log("No such document!");
          }
        })
        .catch((error) => {
          console.log("Error getting document:", error);
        });
    };
    image();
  }, []);

  const fetchUsers = (search) => {
    firebase
      .firestore()
      .collection("utilizadores")
      .where("nome", ">=", search)
      .get()
      .then((snapshot) => {
        let users = snapshot.docs.map((doc) => {
          const data = doc.data();
          const id = doc.id;
          return { id, ...data };
        });
        setUsers(users);
      });
  };
  return (
    <View>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          flexWrap: "wrap",
          marginTop: 20,
        }}
      >
        <View style={{ flex: 0.15 }}>
          <TouchableOpacity onPress={() => setSearch(false)}>
            <Ionicons name="chevron-back-outline" size={40} color="black" />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 0.8,
            alignSelf: "center",
            backgroundColor: "lightgray",
            height: 40,
            borderRadius: 20,
          }}
        >
          <TextInput
            onChangeText={(search) => fetchUsers(search)}
            style={{ flex: 1, marginHorizontal: 10 }}
          />
        </View>
      </View>
      <View style={{ marginTop: 50 }}>
        <FlatList
          numColumns={1}
          horizontal={false}
          data={users}
          renderItem={({ item }) => (
            <View
              style={{
                height: 80,
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
              <View
                style={{
                  flex: 0.4,
                  justifyContent: "center",
                  backgroundColor: "#ff7033",
                  alignItems: "center",
                  marginRight: 20,
                  borderRadius: 8,
                  width: 118,
                  height: 31,
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    const id = item.id;

                    firebase.firestore().collection("notificacoes").add({
                      sender: uid,
                      senderName: nome,
                      senderImage: imagem,
                      receiver: id,
                      type: "Friend Request",
                      status: false,
                    });
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "Roboto",
                      fontSize: 16,
                      fontWeight: "bold",
                      color: "white",
                    }}
                  >
                    Adicionar
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default Search;
