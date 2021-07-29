import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
} from "react-native";
import firebase from "../../config/firebaseConfig";

const ListUsers = ({ navigation, route }) => {
  const [users, setUsers] = useState(null);
  const [selected, setSelected] = useState([]);

  const windowHeight = Dimensions.get("window").height;
  const windowWidth = Dimensions.get("window").width; 

  useEffect(() => {
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
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 40,
        }}
      >
        <TouchableOpacity
          style={{ marginLeft: 24, marginBottom: 10 }}
          onPress={() => navigation.goBack()}
        >
          <Image source={require("../../assets/onboarding/back.png")} />
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: 20 }}>
        <FlatList
          numColumns={1}
          horizontal={false}
          data={users}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                if (selected.includes(item.id)) {
                  let index = selected.indexOf(item.id);

                  if (index > -1) {
                    selected.splice(index, 1);
                  }
                  setSelected([...selected]);
                } else {
                setSelected([...selected, item.id]);
                }
              }}
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
                <View
                  style={
                    selected.includes(item.id)
                      ? {
                          height: 30,
                          width: 30,
                          borderRadius: 60,
                          backgroundColor: "#fcfcfc",
                          marginRight: 20,
                          borderColor: "#ff7033",
                          borderStyle: "solid",
                          borderWidth: 8,
                        }
                      : {
                          height: 30,
                          width: 30,
                          borderRadius: 60,
                          backgroundColor: "#d9dbe9",
                          marginRight: 20,
                        }
                  }
                  buttonId={item.id}
                />
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
            </TouchableOpacity>
          )}
        />
      </View>
      {(selected.length != 0) ?  (      
          <TouchableOpacity
        onPress={() => {
          navigation.navigate('CriarPlano', {selected: selected});
        }}
        style={{
          width: 360,
          height: 50,
          backgroundColor: "#fcfcfc",
          borderRadius: 8,
          borderWidth: 3,
          borderColor:"#ff7033",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          top: windowHeight - 70,
          left: windowWidth / 2 - 360 / 2,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            fontFamily: "Roboto",
            color: "#ff7033",
          }}
        >
          Convidar
        </Text>
      </TouchableOpacity>
      ) :
      (<View />)
      }
    </SafeAreaView>
  );
};

export default ListUsers;
