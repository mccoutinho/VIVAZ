import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import CardUnlinked from "./CardUnlinked";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import dateFormat from "dateformat";
import firebase from "../../config/firebaseConfig";
import ListInvites from "./ListInvites";

const CriarPlano = ({ navigation, route }) => {
  const { id, nome, imagem } = route.params;
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [showDatePicker, setShowDate] = useState(false);
  const [nomePlano, setNomePlano] = useState("");
  const [descricaoPlano, setDescricaoPlano] = useState("");
  const userId = firebase.auth().currentUser.uid;

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
    setShowDate(false);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const guardarPlano = async () => {
    try {
      firebase
        .firestore()
        .collection("planos")
        .add({
            criador:[userId],
            rota: nome,
            nome: nomePlano,
            descricao: descricaoPlano,
            data: date,
            convidados: route.params?.selected,
            pending: route.params?.selected,
            imagem: imagem,
        })
        .then(() => {
          console.log("Document successfully written!");
          navigation.goBack();
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        });
    } catch (err) {
      console.log("Couldn't write!");
    }
  };

  if (showDatePicker) {
    return (
      <RNDateTimePicker
        value={date}
        mode={mode}
        is24Hour={true}
        display="default"
        onChange={onChange}
        dateFormat="dayofweek day month"
      />
    );
  } else {
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
            style={{ marginLeft: 24, marginBottom: 20 }}
            onPress={() => navigation.goBack()}
          >
            <Image source={require("../../assets/onboarding/back.png")} />
          </TouchableOpacity>
        </View>
        <ScrollView>
          <CardUnlinked image={imagem} />
          <TouchableOpacity
            style={{ justifyContent: "center", alignItems: "center" }}
          >
            <View
              style={{
                height: 64,
                width: 360,
                borderRadius: 16,
                backgroundColor: "#eff0f6",
                paddingLeft: 20,
                fontSize: 18,
                marginTop: 24,
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontFamily: "Roboto",
                  fontSize: 16,
                  fontWeight: "bold",
                }}
              >
                {nome}
              </Text>
            </View>
          </TouchableOpacity>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <View
              style={{ alignSelf: "flex-start", marginTop: 24, marginLeft: 34 }}
            >
              <Text
                style={{
                  fontFamily: "Roboto",
                  fontSize: 16,
                  fontWeight: "bold",
                }}
              >
                Nome do Plano
              </Text>
            </View>

            <View
              style={{
                height: 64,
                width: 360,
                borderRadius: 16,
                backgroundColor: "#eff0f6",
                paddingLeft: 20,
                fontSize: 18,
                marginTop: 8,
                justifyContent: "center",
              }}
            >
              <TextInput
                style={{ fontFamily: "Roboto", fontSize: 16 }}
                placeholder={"Nome do Plano"}
                value={nomePlano}
                onChangeText={setNomePlano}
              />
            </View>
            <View
              style={{ alignSelf: "flex-start", marginTop: 24, marginLeft: 34 }}
            >
              <Text
                style={{
                  fontFamily: "Roboto",
                  fontSize: 16,
                  fontWeight: "bold",
                }}
              >
                Descrição do Plano
              </Text>
            </View>

            <View
              style={{
                height: 150,
                width: 360,
                borderRadius: 16,
                backgroundColor: "#eff0f6",
                paddingHorizontal: 20,
                fontSize: 18,
                marginTop: 8,
                paddingTop: 12,
              }}
            >
              <TextInput
                style={{
                  fontFamily: "Roboto",
                  fontSize: 16,
                }}
                placeholder={"Descrição do Plano"}
                multiline={true}
                value={descricaoPlano}
                onChangeText={setDescricaoPlano}
              />
            </View>
          </View>
          <Text
            style={{
              fontFamily: "Roboto",
              fontSize: 16,
              fontWeight: "bold",
              marginLeft: 30,
              marginTop: 24,
            }}
          >
            Quando
          </Text>
          <TouchableOpacity
            style={{ justifyContent: "center", alignItems: "center" }}
            onPress={() => {
              setMode("date");
              setShowDate(true);
            }}
          >
            <View
              style={{
                height: 64,
                width: 360,
                borderRadius: 16,
                backgroundColor: "#eff0f6",
                paddingLeft: 20,
                fontSize: 18,
                marginTop: 8,
                justifyContent: "center",
              }}
            >
              <Text style={{ fontFamily: "Roboto", fontSize: 14 }}>
                {dateFormat(date, "dddd, mmmm dS, yyyy")}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ justifyContent: "center", alignItems: "center" }}
            onPress={() => {
              setMode("time");
              setShowDate(true);
            }}
          >
            <View
              style={{
                height: 64,
                width: 360,
                borderRadius: 16,
                backgroundColor: "#eff0f6",
                paddingLeft: 20,
                fontSize: 18,
                marginTop: 8,
                justifyContent: "center",
              }}
            >
              <Text style={{ fontFamily: "Roboto", fontSize: 14 }}>
                {dateFormat(date, "HH:MM")}
              </Text>
            </View>
          </TouchableOpacity>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <View
              style={{ alignSelf: "flex-start", marginTop: 24, marginLeft: 34 }}
            >
              <Text
                style={{
                  fontFamily: "Roboto",
                  fontSize: 16,
                  fontWeight: "bold",
                }}
              >
                Participantes
              </Text>
            </View>
            <TouchableOpacity
              style={{
                height: 64,
                width: 360,
                borderRadius: 16,
                backgroundColor: "#eff0f6",
                paddingLeft: 20,
                fontSize: 18,
                marginTop: 8,
                justifyContent: "center",
              }}
              onPress={() => navigation.navigate("ListUsers")}
            >
              <Text style={{ fontFamily: "Roboto", fontSize: 16 }}>
                Escolher amigos
              </Text>
            </TouchableOpacity>
            {route.params?.selected ? (
              route.params?.selected.map((element, index) => {
                return <ListInvites selected={element} key={index} />;
              })
            ) : (
              <View />
            )}
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                width: 360,
                alignSelf: "center",
                justifyContent: "space-between",
                marginVertical: 24,
              }}
            >
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <View
                  style={{
                    width: 170,
                    height: 40,
                    borderStyle: "solid",
                    borderColor: "#ff7033",
                    borderWidth: 3,
                    borderRadius: 8,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "Roboto",
                      fontSize: 14,
                      color: "#ff7033",
                      fontWeight: "bold",
                    }}
                  >
                    Eliminar
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={guardarPlano}>
                <View
                  style={{
                    width: 170,
                    height: 40,
                    backgroundColor: "#ff7033",
                    borderRadius: 8,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "Roboto",
                      fontSize: 14,
                      color: "#fcfcfc",
                      fontWeight: "bold",
                    }}
                  >
                    Guardar
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
};

export default CriarPlano;
