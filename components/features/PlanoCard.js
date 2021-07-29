import { element } from "prop-types";
import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import firebase from "../../config/firebaseConfig";
import ImagensConvidados from "./ImagensConvidados";

const PlanoCard = ({
  getInfo,
  id,
  nome,
  imagem,
  descricao,
  data,
  hora,
  criador,
  convidados,
  pending,
  rota,
  pendingState,
  route,
  navigation,
}) => {
  const details = () => {
    getInfo(id, nome, imagem, descricao, rota, data, hora, criador, convidados, pending);
  };

  const numeroConvidados = convidados.length;
  const userId = firebase.auth().currentUser.uid;

  if (!pendingState) {
    return (
      <View>
        <View style={styles.container}>
          <TouchableOpacity onPress={details}>
            <View style={styles.card}>
              <Image source={imagem} style={styles.image} blurRadius={1} />
              <Text style={styles.text}>{nome}</Text>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  zIndex: 1,
                  padding: 20,
                  fontFamily: "Roboto",
                  color: "white",
                  position: "absolute",
                  marginLeft: 205,
                  marginTop: 155,
                }}
              >
                {numeroConvidados} pessoas
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  position: "absolute",
                  marginLeft: 150,
                  marginTop: 175,
                  height: 30,
                  width: 40,
                  justifyContent: "flex-end",
                }}
              >
                {convidados.map((element, index) => {
                  return (
                    <ImagensConvidados
                      style={{ alignSelf: "flex-end" }}
                      convidado={element}
                      numeroConvidados={numeroConvidados}
                      key={index}
                    />
                  );
                })}
              </View>
              <View
                style={{
                  position: "absolute",
                  marginTop: 175,
                  marginLeft: 20,
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  source={require("../../assets/data_w.png")}
                  style={{ width: 30, height: 30 }}
                />
                <Text
                  style={{
                    color: "white",
                    marginLeft: 10,
                    fontSize: 20,
                    fontWeight: "bold",
                    fontFamily: "Roboto",
                  }}
                >
                  {data}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  } else if(pendingState) {
    return (
      <View>
        <View style={styles.container}>
          <TouchableOpacity onPress={details}>
            <View style={styles.card}>
              <Image source={imagem} style={styles.image} blurRadius={1} />
              <Text style={styles.text}>{nome}</Text>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  zIndex: 1,
                  padding: 20,
                  fontFamily: "Roboto",
                  color: "white",
                  position: "absolute",
                  marginLeft: 205,
                  marginTop: 155,
                }}
              >
                {numeroConvidados} pessoas
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  position: "absolute",
                  marginLeft: 150,
                  marginTop: 175,
                  height: 30,
                  width: 40,
                  justifyContent: "flex-end",
                }}
              >
                {convidados.map((element, index) => {
                  return (
                    <ImagensConvidados
                      style={{ alignSelf: "flex-end" }}
                      convidado={element}
                      numeroConvidados={numeroConvidados}
                      key={index}
                    />
                  );
                })}
              </View>
              <View
                style={{
                  position: "absolute",
                  marginTop: 175,
                  marginLeft: 20,
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  source={require("../../assets/data_w.png")}
                  style={{ width: 30, height: 30 }}
                />
                <Text
                  style={{
                    color: "white",
                    marginLeft: 10,
                    fontSize: 20,
                    fontWeight: "bold",
                    fontFamily: "Roboto",
                  }}
                >
                  {data}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection:"row", flexWrap:"wrap", justifyContent:"space-between", marginTop:10, alignSelf:"center", width:350}}>
        <TouchableOpacity onPress={async() => {
          await firebase.firestore().collection("planos").doc(id).update({
            pending: firebase.firestore.FieldValue.arrayRemove(userId),
            convidados: firebase.firestore.FieldValue.arrayRemove(userId)
          })
        }}>
                <View
                  style={{
                    width: 160,
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
                    Recusar
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={async() => {
          await firebase.firestore().collection("planos").doc(id).update({
            criador: firebase.firestore.FieldValue.arrayUnion(userId),
            pending: firebase.firestore.FieldValue.arrayRemove(userId)
          });
        }}>
                <View
                  style={{
                    width: 160,
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
                    Aceitar
                  </Text>
                </View>
              </TouchableOpacity>
        </View>
        </View>
    );
  } 
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  image: {
    flex: 1,
    width: "100%",
    height: undefined,
    zIndex: -1,
    alignSelf: "auto",
    borderRadius: 20,
    opacity: 1,
  },
  card: {
    backgroundColor: "grey",
    width: 350,
    height: 218,
    flexDirection: "column",
    justifyContent: "space-between",
    borderRadius: 20,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    zIndex: 1,
    position: "absolute",
    padding: 20,
    fontFamily: "Roboto",
    color: "white",
  },
  card1: {
    backgroundColor: "grey",
    width: 160,
    height: 218,
    justifyContent: "flex-end",
    borderRadius: 20,
  },
  container1: {
    flexDirection: "row",
    marginLeft: 25,
    marginTop: 20,
    flex: 1,
  },
  container2: {
    flexDirection: "row",
    marginRight: 25,
    marginTop: 20,
    alignItems: "flex-end",
    justifyContent: "flex-end",
    alignSelf: "flex-end",
  },
});

export default PlanoCard;
