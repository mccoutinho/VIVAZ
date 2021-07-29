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

const Notifications = ({ setNotification }) => {
  const user = firebase.auth().currentUser;
  const uid = user.uid;
  const [notif, setNotifs] = useState([]);

  useEffect(() => {
    firebase
      .firestore()
      .collection("notificacoes")
      .where("receiver", "==", uid)
      .onSnapshot((snapshot) => {
        let users = snapshot.docs.map((doc) => {
          const data = doc.data();
          const id = doc.id;
          return { id, ...data };
        });
        setNotifs(users);
      });
  }, []);

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
        <TouchableOpacity onPress={() => setNotification(false)}>
          <Ionicons name="chevron-back-outline" size={40} color="black" />
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: 50 }}>
        <FlatList
          numColumns={1}
          horizontal={false}
          data={notif}
          renderItem={({ item }) => {
            if (item.type == "Friend Request") {
              return (
                <View>
                  <View
                    style={{
                      flexDirection: "row",
                      flexWrap: "wrap",
                      flex: 1,
                      justifyContent: "space-between",
                      alignItems: "center",
                      height: 50,
                    }}
                  >
                    <View
                      style={{
                        flex: 1,
                        marginLeft: 20,
                        flexDirection: "row",
                        flexWrap: "wrap",
                      }}
                    >
                      <Image
                        style={{ height: 44, width: 44, borderRadius: 40 }}
                        source={{ uri: item.senderImage }}
                      />
                      <Text
                        style={{
                          fontFamily: "Roboto",
                          fontSize: 16,
                          marginLeft: 20,
                        }}
                      >
                        {item.senderName} enviou-te um pedido de amizade.
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      flex: 1,
                      justifyContent: "space-between",
                      width: "80%",
                      alignSelf: "center",
                      marginRight: 20,
                    }}
                  >
                    <TouchableOpacity
                      onPress={async () =>
                        await firebase
                          .firestore()
                          .collection("notificacoes")
                          .doc(item.id)
                          .delete()
                      }
                    >
                      <View
                        style={{
                          height: 40,
                          width: 146,
                          borderRadius: 8,
                          borderColor: "#ff7730",
                          borderStyle: "solid",
                          borderWidth: 2,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Text
                          style={{
                            fontFamily: "Roboto",
                            fontSize: 16,
                            fontWeight: "bold",
                            color: "#ff7730",
                          }}
                        >
                          Recusar
                        </Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={async () => {
                        await firebase
                          .firestore()
                          .collection("amigos")
                          .doc(item.receiver)
                          .get()
                          .then((doc) => {
                            if (!doc.exists) {
                              firebase
                                .firestore()
                                .collection("amigos")
                                .doc(item.receiver)
                                .set({
                                  friendsList: [item.sender],
                                });
                            } else {
                              firebase
                                .firestore()
                                .collection("amigos")
                                .doc(item.receiver)
                                .update({
                                  friendsList:
                                    firebase.firestore.FieldValue.arrayUnion(
                                      item.sender
                                    ),
                                });
                            }
                          });

                        await firebase
                          .firestore()
                          .collection("amigos")
                          .doc(item.sender)
                          .get()
                          .then((doc) => {
                            if (!doc.exists) {
                              firebase
                                .firestore()
                                .collection("amigos")
                                .doc(item.sender)
                                .set({
                                  friendsList: [item.receiver],
                                });
                            } else {
                              firebase
                                .firestore()
                                .collection("amigos")
                                .doc(item.sender)
                                .update({
                                  friendsList:
                                    firebase.firestore.FieldValue.arrayUnion(
                                      item.receiver
                                    ),
                                });
                            }
                          });

                        await firebase
                          .firestore()
                          .collection("notificacoes")
                          .doc(item.id)
                          .delete();
                      }}
                    >
                      <View
                        style={{
                          height: 40,
                          width: 146,
                          borderRadius: 8,
                          backgroundColor: "#ff7730",
                          justifyContent: "center",
                          alignItems: "center",
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
                          Aceitar
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            }
          }}
        />
      </View>
    </View>
  );
};

export default Notifications;
