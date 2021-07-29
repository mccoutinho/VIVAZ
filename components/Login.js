import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";
import firebase from "../config/firebaseConfig";
import { Ionicons } from "@expo/vector-icons";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const loginUser = async () => {
    try {
      const response = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
      const user = firebase.auth().currentUser;
      navigation.navigate("Homescreen");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fcfcfc" }}>
      <View
        style={{
          flex: 0.01,
          flexDirection: "row",
          flexWrap: "wrap",
          marginTop: 40,
          marginLeft: 30,
          marginBottom: 24,
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("Onboarding")}
          style={{ position: "absolute" }}
        >
          <Image source={require("../assets/onboarding/back.png")} />
        </TouchableOpacity>
      </View>
      <View style={{ width: "100%", height: 200, marginTop: 24 }}>
        <Text
          style={{
            fontSize: 18,
            marginLeft: 30,
            marginBottom: 10,
            fontFamily: "Roboto",
            color: "#8c8ca1",
          }}
        >
          E-mail
        </Text>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <TextInput
            style={styles.forms}
            onChangeText={setEmail}
            value={email}
            placeholder={"E-mail"}
          />
        </View>
        <Text
          style={{
            fontSize: 18,
            marginLeft: 30,
            marginVertical: 10,
            fontFamily: "Roboto",
            color: "#8c8ca1",
          }}
        >
          Palavra-passe
        </Text>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <TextInput
            style={styles.forms}
            onChangeText={setPassword}
            value={password}
            placeholder={"Palavra-passe"}
            secureTextEntry
          />
          <Text style={{ color: "red" }}>{error}</Text>
        </View>
        <View style={{ marginLeft: 30 }}>
          <Text
            style={{ color: "#8c8ca1", fontFamily: "Roboto", fontSize: 14 }}
          >
            Esqueceu-se da palavra-passe?
          </Text>
        </View>
        <View
          style={{
            justifyContent: "center",
            width: "85%",
            alignSelf: "center",
            marginTop: 24,
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                width: 150,
                height: 1,
                borderStyle: "solid",
                borderTopWidth: 2,
                borderTopColor: "#8c8ca1",
                alignSelf: "center",
              }}
            />
            <Text
              style={{ fontFamily: "Roboto", color: "#8c8ca1", fontSize: 14 }}
            >
              {" "}
              ou{" "}
            </Text>
            <View
              style={{
                width: 150,
                height: 1,
                borderStyle: "solid",
                borderTopWidth: 2,
                borderTopColor: "#8c8ca1",
                alignSelf: "center",
              }}
            />
          </View>
        </View>
        <View
          style={{
            borderStyle: "solid",
            borderColor: "#ff7033",
            justifyContent: "center",
            alignItems: "center",
            borderWidth: 2,
            alignSelf: "center",
            height: 45,
            width: 360,
            borderRadius: 8,
            marginVertical: 40,
          }}
        >
          <Text style={{ fontFamily: "Roboto", fontSize: 18 }}>
            Continuar com o Google
          </Text>
        </View>
      </View>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View
          style={{ alignItems: "center", position: "absolute", bottom: 24 }}
        >
          <TouchableOpacity
            onPress={() => loginUser()}
            style={{
              width: 360,
              height: 64,
              backgroundColor: "#ff7033",
              borderRadius: 8,
              justifyContent: "center",
              alignItems: "center",
              elevation:8
            }}
          >
            <Text
              style={{
                fontSize: 24,
                fontWeight: "bold",
                fontFamily: "Roboto",
                color: "#f7f7fc",
              }}
            >
              Entrar
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  forms: {
    height: 64,
    width: 360,
    borderRadius: 16,
    backgroundColor: "#eff0f6",
    paddingLeft: 20,
    fontSize: 18,
  },
});
