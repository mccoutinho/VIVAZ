import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";
import firebase from "../config/firebaseConfig";
import * as Progress from "react-native-progress";
import { Ionicons } from "@expo/vector-icons";
import ImagePickerUser from "../components/features/ImagePickerUser";
import { Picker } from "@react-native-community/picker";
import GenderPicker from "./features/GenderPicker";

const Register = ({ navigation }) => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nome, setNome] = useState("");
  const [error, setError] = useState("");
  const [sexo, setSexo] = useState("");
  const [imagem, setImagem] = useState("");
  const [concelho, setConcelho] = useState("");
  const [avatar, setAvatar] = useState(null);

  const registerUser = async () => {
    try {
      const reponse = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      firebase.auth().signInWithEmailAndPassword(email, password);
      setStep(3);
    } catch (err) {
      setError(err.message);
    }
  };

  const guardarNome = async () => {
    try {
      const user = firebase.auth().currentUser;
      const uid = user.uid;

      const response = await user.updateProfile({
        displayName: nome,
      });

      firebase
        .firestore()
        .collection("utilizadores")
        .doc(uid)
        .set({
          email: email,
          nome: nome,
        })
        .then(() => {
          console.log("Document successfully written!");
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        });

      setStep(4);
      //navigation.navigate("Homescreen"); -> Adicionar no último step
      console.log("Success");
    } catch (err) {
      console.log("Erro");
    }
  };

  const guardarSexo = async () => {
    try {
      const user = firebase.auth().currentUser;
      const uid = user.uid;

      firebase
        .firestore()
        .collection("utilizadores")
        .doc(uid)
        .set({
          nome: nome,
          email: email,
          sexo: sexo,
        })
        .then(() => {
          console.log("Document successfully written!");
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        });

      setStep(5);
      //navigation.navigate("Homescreen"); -> Adicionar no último step
      console.log("Success");
    } catch (err) {
      console.log("Erro");
    }
  };

  const guardarConcelho = async () => {
    try {
      const user = firebase.auth().currentUser;
      const uid = user.uid;

      firebase
        .firestore()
        .collection("utilizadores")
        .doc(uid)
        .set({
          nome: nome,
          email: email,
          sexo: sexo,
          concelho: concelho,
        })
        .then(() => {
          console.log("Document successfully written!");
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        });

      setStep(6);

      console.log("Success");
    } catch (err) {
      console.log("Erro");
    }
  };

  const guardarImagem = async () => {
    const user = firebase.auth().currentUser;
    const uid = user.uid;

    if (avatar == null) {
      const ref = firebase.storage().ref().child(`users/${uid}`);

      try {
        await ref.getDownloadURL();
        setImagem(await ref.getDownloadURL());

        firebase
          .firestore()
          .collection("utilizadores")
          .doc(uid)
          .set({
            nome: nome,
            email: email,
            sexo: sexo,
            concelho: concelho,
            imagem: await ref.getDownloadURL(),
          })
          .then(() => {
            console.log("Document successfully written!");
          })
          .catch((error) => {
            console.error("Error writing document: ", error);
          });

        setStep(7);
      } catch (err) {
        alert("Aguarde, estamos a fazer upload!");
      }
    }

    if (avatar == "man") {
      const ref = firebase.storage().ref().child("avatars/Man.png");

      try {
        await ref.getDownloadURL();
        setImagem(await ref.getDownloadURL());

        firebase
          .firestore()
          .collection("utilizadores")
          .doc(uid)
          .set({
            nome: nome,
            email: email,
            sexo: sexo,
            concelho: concelho,
            imagem: await ref.getDownloadURL(),
          })
          .then(() => {
            console.log("Document successfully written!");
          })
          .catch((error) => {
            console.error("Error writing document: ", error);
          });

        setStep(7);
      } catch (err) {
        alert("Aguarde, estamos a fazer upload!");
      }
    }

    if (avatar == "woman") {
      const ref = firebase.storage().ref().child("avatars/Woman.png");

      try {
        await ref.getDownloadURL();
        setImagem(await ref.getDownloadURL());
        firebase
          .firestore()
          .collection("utilizadores")
          .doc(uid)
          .set({
            nome: nome,
            email: email,
            sexo: sexo,
            concelho: concelho,
            imagem: await ref.getDownloadURL(),
          })
          .then(() => {
            console.log("Document successfully written!");
          })
          .catch((error) => {
            console.error("Error writing document: ", error);
          });

        setStep(7);
      } catch (err) {
        alert("Aguarde, estamos a fazer upload!");
      }
    }
  };

  const getAvatar = (sexo) => {
    if(sexo == "man") {
      setAvatar("man");
    }
    if(sexo== "woman") {
      setAvatar("woman");
    }
  }

  if (step == 1) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => navigation.navigate("Onboarding")}>
            <Image source={require("../assets/onboarding/back.png")} />
          </TouchableOpacity>
          <View
            style={{
              justifyContent: "center",
              marginRight: 30,
            }}
          >
            <Progress.Bar
              progress={0}
              color={"#ff7033"}
              width={310}
              height={18}
              borderRadius={10}
              style={{ backgroundColor: "#eff0f6", borderWidth: 0 }}
            />
          </View>
        </View>
        <View style={styles.formMargin}>
          <Text
            style={{
              fontSize: 18,
              marginLeft: 30,
              marginVertical: 10,
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
            <Text style={{ color: "red" }}>{error}</Text>
          </View>
        </View>
        <View
          style={{
            alignItems: "center",
            alignSelf: "center",
            position: "absolute",
            bottom: 24,
          }}
          behavior="position"
          keyboardVerticalOffset={50}
        >
          <TouchableOpacity
            onPress={() => setStep(step + 1)}
            style={styles.appButtonContainer}
          >
            <Text style={styles.appButtonText}>Seguinte</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
  if (step == 2) {
    if (error == "The email address is badly formatted.") {
      setStep(1);
      setTimeout(() => {
        setError("");
      }, 5000);
    } else {
      return (
        <SafeAreaView style={styles.container}>
          <View style={styles.topBar}>
            <TouchableOpacity onPress={() => setStep(step - 1)}>
              <Image source={require("../assets/onboarding/back.png")} />
            </TouchableOpacity>
            <View
              style={{
                justifyContent: "center",
                marginRight: 30,
              }}
            >
              <Progress.Bar
                progress={0.14}
                color={"#ff7033"}
                width={310}
                height={18}
                borderRadius={10}
                style={{ backgroundColor: "#eff0f6", borderWidth: 0 }}
              />
            </View>
          </View>
          <View style={styles.formMargin}>
            <Text
              style={{
                fontSize: 18,
                marginLeft: 30,
                marginVertical: 10,
                fontFamily: "Roboto",
                color: "#8c8ca1",
              }}
            >
              Criar uma palavra-passe
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
          </View>
          <View
            style={{
              alignItems: "center",
              alignSelf: "center",
              position: "absolute",
              bottom: 24,
            }}
            behavior="position"
            keyboardVerticalOffset={50}
          >
            <TouchableOpacity
              onPress={() => registerUser()}
              style={styles.appButtonContainer}
            >
              <Text style={styles.appButtonText}>Seguinte</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      );
    }
  }

  if (step == 3) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => setStep(step - 1)}>
            <Image source={require("../assets/onboarding/back.png")} />
          </TouchableOpacity>
          <View
            style={{
              justifyContent: "center",
              marginRight: 30,
            }}
          >
            <Progress.Bar
              progress={0.28}
              color={"#ff7033"}
              width={310}
              height={18}
              borderRadius={10}
              style={{ backgroundColor: "#eff0f6", borderWidth: 0 }}
            />
          </View>
        </View>
        <View style={styles.formMargin}>
          <Text
            style={{
              fontSize: 18,
              marginLeft: 30,
              marginVertical: 10,
              fontFamily: "Roboto",
              color: "#8c8ca1",
            }}
          >
            Nome
          </Text>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <TextInput
              style={styles.forms}
              onChangeText={setNome}
              value={nome}
            />
          </View>
        </View>
        <View
          style={{
            alignItems: "center",
            alignSelf: "center",
            position: "absolute",
            bottom: 24,
          }}
          behavior="position"
          keyboardVerticalOffset={50}
        >
          <TouchableOpacity
            onPress={() => guardarNome()}
            style={styles.appButtonContainer}
          >
            <Text style={styles.appButtonText}>Seguinte</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
  if (step == 4) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => setStep(step - 1)}>
            <Image source={require("../assets/onboarding/back.png")} />
          </TouchableOpacity>
          <View
            style={{
              justifyContent: "center",
              marginRight: 30,
            }}
          >
            <Progress.Bar
              progress={0.56}
              color={"#ff7033"}
              width={310}
              height={18}
              borderRadius={10}
              style={{ backgroundColor: "#eff0f6", borderWidth: 0 }}
            />
          </View>
        </View>
        <View style={styles.formMargin}>
          <Text
            style={{
              fontSize: 18,
              marginLeft: 30,
              marginTop: 10,
              fontFamily: "Roboto",
              color: "#8c8ca1",
            }}
          >
            Sexo
          </Text>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <GenderPicker setSexo={setSexo} />
          </View>
        </View>
        <View
          style={{
            alignItems: "center",
            alignSelf: "center",
            position: "absolute",
            bottom: 24,
          }}
          behavior="position"
          keyboardVerticalOffset={50}
        >
          <TouchableOpacity
            onPress={() => guardarSexo()}
            style={styles.appButtonContainer}
          >
            <Text style={styles.appButtonText}>Seguinte</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
  if (step == 6) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => setStep(step - 1)}>
            <Image source={require("../assets/onboarding/back.png")} />
          </TouchableOpacity>
          <View
            style={{
              justifyContent: "center",
              marginRight: 30,
            }}
          >
            <Progress.Bar
              progress={0.84}
              color={"#ff7033"}
              width={310}
              height={18}
              borderRadius={10}
              style={{ backgroundColor: "#eff0f6", borderWidth: 0 }}
            />
          </View>
        </View>
        <View style={styles.formMargin}>
          <Text
            style={{
              fontSize: 18,
              marginLeft: 30,
              marginTop: 10,
              fontFamily: "Roboto",
              color: "#8c8ca1",
            }}
          >
            Foto de Perfil
          </Text>
        </View>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <ImagePickerUser />
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
        <Text
          style={{
            fontSize: 18,
            marginLeft: 30,
            marginTop: 30,
            fontFamily: "Roboto",
            color: "#8c8ca1",
          }}
        >
          Seleciona um avatar:
        </Text>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
            marginTop: 20,
            marginHorizontal: 30,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              getAvatar("man");
            }}
          >
              {avatar == "man" ? (
                <Image
                  style={{
                    borderRadius: 80,
                    borderWidth: 5,
                    borderColor: "#ff7033",
                    width:160,
                    height:160
                  }}
                  source={require("../assets/onboarding/Man.png")}
                />
              ) : (
                <Image
                  style={{ borderRadius: 80, height:160, width:160 }}
                  source={require("../assets/onboarding/Man.png")}
                />
              )}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => getAvatar("woman")}>
              {avatar == "woman" ? (
                <Image
                  style={{
                    borderRadius: 80,
                    borderWidth: 5,
                    borderColor: "#ff7033",
                    height:160,
                    width:160
                  }}
                  source={require("../assets/onboarding/Woman.png")}
                />
              ) : (
                <Image
                  style={{ borderRadius: 80, height:160, width:160 }}
                  source={require("../assets/onboarding/Woman.png")}
                />
              )}
          </TouchableOpacity>
        </View>
        <View
          style={{
            alignItems: "center",
            alignSelf: "center",
            position: "absolute",
            bottom: 24,
          }}
          behavior="position"
          keyboardVerticalOffset={50}
        >
          <TouchableOpacity
            onPress={() => guardarImagem()}
            style={styles.appButtonContainer}
          >
            <Text style={styles.appButtonText}>Seguinte</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
  if (step == 5) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => setStep(step - 1)}>
            <Image source={require("../assets/onboarding/back.png")} />
          </TouchableOpacity>
          <View
            style={{
              justifyContent: "center",
              marginRight: 30,
            }}
          >
            <Progress.Bar
              progress={0.7}
              color={"#ff7033"}
              width={310}
              height={18}
              borderRadius={10}
              style={{ backgroundColor: "#eff0f6", borderWidth: 0 }}
            />
          </View>
        </View>
        <View style={styles.formMargin}>
          <Text
            style={{
              fontSize: 18,
              marginLeft: 30,
              marginVertical: 10,
              fontFamily: "Roboto",
              color: "#8c8ca1",
            }}
          >
            Concelho
          </Text>
        </View>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <View style={styles.formsConc}>
            <Picker
              selectedValue={concelho}
              style={{ width: 320, height: 100 }}
              onValueChange={(itemValue) => setConcelho(itemValue)}
            >
              <Picker.Item label="Águeda" value="Águeda" />
              <Picker.Item
                label="Albergaria-a-Velha"
                value="Albergaria-a-Velha"
              />
              <Picker.Item label="Anadia" value="Anadia" />
              <Picker.Item label="Arouca" value="Arouca" />
              <Picker.Item label="Aveiro" value="Aveiro" />
              <Picker.Item label="Castelo de Paiva" value="Castelo de Paiva" />
              <Picker.Item label="Espinho" value="Espinho" />
              <Picker.Item label="Estarreja" value="Estarreja" />
              <Picker.Item label="Ílhavo" value="Ílhavo" />
              <Picker.Item label="Mealhada" value="Mealhada" />
              <Picker.Item label="Murtosa" value="Murtosa" />
              <Picker.Item label="Ovar" value="Ovar" />
              <Picker.Item
                label="Santa Maria da Feira"
                value="Santa Maria da Feira"
              />
              <Picker.Item label="Sever do Vouga" value="Sever do Vouga" />
              <Picker.Item label="Vagos" value="Vagos" />
              <Picker.Item label="Vale de Cambra" value="Vale de Cambra" />
            </Picker>
          </View>
        </View>
        <View
          style={{
            alignItems: "center",
            alignSelf: "center",
            position: "absolute",
            bottom: 24,
          }}
          behavior="position"
          keyboardVerticalOffset={50}
        >
          <TouchableOpacity
            onPress={() => guardarConcelho()}
            style={styles.appButtonContainer}
          >
            <Text style={styles.appButtonText}>Seguinte</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
  if (step == 7) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => setStep(step - 1)}>
            <Image source={require("../assets/onboarding/back.png")} />
          </TouchableOpacity>
          <View
            style={{
              justifyContent: "center",
              marginRight: 30,
            }}
          >
            <Progress.Bar
              progress={1}
              color={"#ff7033"}
              width={310}
              height={18}
              borderRadius={10}
              style={{ backgroundColor: "#eff0f6", borderWidth: 0 }}
            />
          </View>
        </View>
        <View style={styles.formMargin}>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Image style={{width:350, height:350, marginTop:20 }} source={require('../assets/onboarding/animated.gif')} />
          </View>
          <View style={{ flex: 0.8, marginTop: 24 }}>
          <Text
            style={{
              fontFamily: "Roboto",
              fontSize: 40,
              fontWeight: "bold",
              marginLeft: 24,
            }}
          >
          Olá, {nome}! 
          </Text>
          <Text style={{ fontFamily: "Roboto", fontSize: 16, marginHorizontal: 24, marginTop:5 }}>
          Agora que está registado, é iniciar a aventura e partir à descoberta.
          </Text>
        </View>
        </View>
        <View
          style={{
            alignItems: "center",
            alignSelf: "center",
            position: "absolute",
            bottom: 24,
          }}
          behavior="position"
          keyboardVerticalOffset={50}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate('Homescreen')}
            style={styles.appButtonContainer}
          >
            <Text style={styles.appButtonText}>Começar</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
};

export default Register;

const styles = StyleSheet.create({
  forms: {
    height: 40,
    width: 300,
    borderWidth: 1,
  },
  appButtonContainer: {
    width: 360,
    height: 64,
    backgroundColor: "#ff7033",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
  },
  appButtonText: {
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: "Roboto",
    color: "#f7f7fc",
  },
  container: {
    flex: 1,
    backgroundColor: "#fcfcfc",
  },
  topBar: {
    flex: 0.01,
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 40,
    marginLeft: 24,
    marginBottom: 24,
    justifyContent: "space-between",
  },
  forms: {
    height: 64,
    width: 360,
    borderRadius: 16,
    backgroundColor: "#eff0f6",
    paddingLeft: 20,
    fontSize: 18,
  },
  formMargin: {
    marginTop: 16,
  },
  formsConc: {
    height: 64,
    width: 360,
    borderRadius: 16,
    backgroundColor: "#eff0f6",
    paddingLeft: 20,
    fontSize: 18,
    justifyContent: "center",
    alignItems: "center",
  },
});
