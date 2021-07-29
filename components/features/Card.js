import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";

const Card = ({
  getInfo,
  id,
  text,
  image,
  descricao,
  duracao,
  tipo,
  dificuldade,
  paragens,
  terreno,
  circuito,
  pontos,
  route,
  navigation
}) => {
  const details = () => {
    getInfo(
      id,
      text,
      image,
      descricao,
      duracao,
      tipo,
      dificuldade,
      paragens,
      terreno,
      circuito,
      route,
      pontos
    );
  };

  if (id == 1) {
    return (
      <View>
        <View style={styles.container}>
          <TouchableOpacity onPress={details}>
            <View style={styles.card}>
              <Image source={image} style={styles.image} blurRadius={1} />
              <Text style={styles.text}>{text}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <Text style={{marginTop:20, fontFamily:"Roboto", fontSize:24, fontWeight:"bold"}}>Sugestões da Semana</Text>
      </View>
    );
  }
  if (id > 1) {
    if (id % 2 != 0) {
      return (
        <TouchableOpacity
          style={{ alignSelf: "flex-end", marginRight: 25, marginLeft: 10 }}
          onPress={details}
        >
          <View style={styles.card1}>
            <Image source={image} style={styles.image} blurRadius={1} />
            <Text style={styles.text}>{text}</Text>
          </View>
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity
        style={{ marginLeft: 25, marginTop: 20, marginRight: 10 }}
        onPress={details}
      >
        <View style={styles.card1}>
          <Image source={image} style={styles.image} blurRadius={1} />
          <Text style={styles.text}>{text}</Text>
        </View>
      </TouchableOpacity>
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
    justifyContent: "flex-end",
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

export default Card;
