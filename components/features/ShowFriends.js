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
import { NavigationContainer } from "@react-navigation/native";
import ListFriends from "./ListFriends";

const ShowFriends = ({ navigation, route }) => {
  const user = firebase.auth().currentUser;
  const uid = user.uid;
  const [users, setUsers] = useState([]);

  const { friends } = route.params;

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
        <View
          style={{
            height: 60,
            marginTop: 5,
            marginLeft: 24,
            justifyContent: "center",
          }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={require("../../assets/onboarding/back.png")} />
          </TouchableOpacity>
        </View>
        <View style={{flexDirection:"column", flex:1}}>
        {friends ? (
              friends.map((element, index) => {
                return <ListFriends friend={element} key={index} />;
              })
            ) : (
              <View />
            )}
        </View>
      </View>
    </View>
  );
};

export default ShowFriends;

/* <FlatList
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
            </View>
          )}
        /> */
